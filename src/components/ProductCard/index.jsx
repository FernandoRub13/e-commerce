import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { addProduct } from '../../redux/Cart/cart.action'
import { fetchProductStart, setProduct } from '../../redux/Products/products.actions'
import Button from '../forms/Button'
import './styles.scss'

const mapState =({productsData}) =>({
  product: productsData.product
})

const ProductCard = () => {
  const {productID} = useParams() 
  const dispatch = useDispatch()
  const { product } = useSelector(mapState)

  const { productName, productThumbnail, productPrice, productDesc} = product;
  useEffect(() => {
    dispatch(
      fetchProductStart(productID)
    )
    return()=>{
      dispatch(setProduct({}))
    }

  }, [])

  const handleAddToCart= (product)=>{
    if(!product) return;
    dispatch(addProduct(
      product
    ))

  };

  const configAddToCartBtn = {
    type: 'button'
  }

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt="" />
      </div>
      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>
          <li><span>${productPrice}</span></li>
          <li>
            <div className="addToCart">
              <Button onClick={()=> handleAddToCart(product)} {...configAddToCartBtn}>Add to cart</Button>
              </div>
          </li>
          <li>
            <span dangerouslySetInnerHTML={{__html: productDesc}} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProductCard
