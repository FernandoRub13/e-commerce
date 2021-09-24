import React, { useState, useEffect } from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './styles.scss'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { CountryDropdown } from 'react-country-region-selector'
import { apiInstance } from '../../Utils'
import { selectCartItemsCount, selectCartTotal } from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/Cart/cart.action'
import { useHistory } from 'react-router'

const initialAddressState ={
  line1:'',
  line2:'',
  city:'',
  state:'',
  postal_code:'',
  country:''
}

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount
})

const PaymentDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const stripe = useStripe()
  const elements = useElements();
  const {total, itemCount} = useSelector(mapState)
  const [billingAddress, setBillingAddress] = useState({...initialAddressState})
  const [shippingAddress, setShippingAddress] = useState({...initialAddressState})
  const [recipientName, setRecipientName] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  useEffect(() => {
    if(itemCount<1){
      history.push('/');
    }
    
  }, [itemCount]);

  const handleShipping =e =>{
    const {name, value}= e.target
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    })
  }
  const handleBilling =e =>{
    const {name, value}= e.target
    setBillingAddress({
      ...billingAddress,
      [name]: value
    })
  }
  
  const handleFormSubmit = async evt =>{
    evt.preventDefault();
    const  cardElement = elements.getElement('card');

    if(!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postal_code || !shippingAddress.country || 
      !billingAddress.line1 || !billingAddress.city || !billingAddress.state || !billingAddress.postal_code || !billingAddress.country ||
      !recipientName || !nameOnCard){
      return
    }

    apiInstance.post('/payments/create', {
      amount: total * 100,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress
        }
      }
    })
    .then(({data: clientSecret})=>{
      stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details:{
          name: nameOnCard,
          address: {
            ...billingAddress
          }
        }
      }).then(({paymentMethod})=>{
        stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id
        })
        .then(({paymentIntent})=>{
          dispatch(clearCart())
          console.log(paymentIntent);
        })
      })
    });
    
  }

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px'
      }
    },
    hidePostalCode: true
  }

  return (
    <div className="paymentDetails">

      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput required handleChange={(e)=>setRecipientName(e.target.value)} name="recipientName" value={recipientName} placeholder="Recipient Name" type="text" />
          <FormInput required handleChange={evt =>handleShipping(evt)} name="line1" value={shippingAddress.line1} placeholder="Line 1" type="text" />
          <FormInput handleChange={evt =>handleShipping(evt)} name="line2" value={shippingAddress.line2} placeholder="Line 2" type="text" />
          <div className="formRow checkoutInput"><CountryDropdown required onChange={val => handleShipping({target: { name: 'country', value: val}})} value={shippingAddress.country} valueType="short" /></div>
          <FormInput required handleChange={evt =>handleShipping(evt)} name="city" value={shippingAddress.city} placeholder="City" type="text" />
          <FormInput required handleChange={evt =>handleShipping(evt)} name="state" value={shippingAddress.state} placeholder="State" type="text" />
          <FormInput required handleChange={evt =>handleShipping(evt)} name="postal_code" value={shippingAddress.postal_code} placeholder="Postal Code" type="text" />
        </div>
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput required handleChange={(e)=>setNameOnCard(e.target.value)} name="nameOnCard" value={nameOnCard} placeholder="Name on Card" type="text" />
          <FormInput required handleChange={evt =>handleBilling(evt)} name="line1" value={billingAddress.line1} placeholder="Line 1" type="text" />
          <FormInput handleChange={evt =>handleBilling(evt)} name="line2" value={billingAddress.line2} placeholder="Line 2" type="text" />
          <div className="formRow checkoutInput"><CountryDropdown required onChange={val => handleBilling({target: { name: 'country', value: val}})} value={billingAddress.country} valueType="short" /></div>
          <FormInput required handleChange={evt =>handleBilling(evt)} name="city" value={billingAddress.city} placeholder="City" type="text" />
          <FormInput required handleChange={evt =>handleBilling(evt)} name="state" value={billingAddress.state} placeholder="State" type="text" />
          <FormInput required handleChange={evt =>handleBilling(evt)} name="postal_code" value={billingAddress.postal_code} placeholder="Postal Code" type="text" />
        </div>
        <div className="group">
          <h2>Card Details</h2>
          <CardElement options={configCardElement} />
        </div>

        <Button type="submit">Pay now</Button>

      </form>
      
    </div>
  )
}

export default PaymentDetails
