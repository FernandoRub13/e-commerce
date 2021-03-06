import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../../redux/Cart/cart.selectors";
import { createStructuredSelector } from "reselect";
import "./styles.scss";
import Button from "../forms/Button";
import Item from "./Item";
import { useHistory } from "react-router";

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal
});

const Checkout = () => {
  
  const { cartItems, total } = useSelector(mapState);

  const errMsg = "Your cart is empty!";

  const history = useHistory()


  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="cart">
        { cartItems.length>0 ? (<table  border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <table className="checkoutHeader" border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                  </tr>
                </tbody>
              </table>
            </tr>

            <tr>
              <table border="0" cellPadding="0" cellSpacing="0">
                <tbody>
                  {cartItems.map((item, pos) => {
                    return (
                      <tr key="pos">
                        <td>
                          <Item {...item}></Item>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </tr>

            <tr>
              <table align="right" border="0" cellSpacing="0" cellPadding="10">
                <tr align="right">
                  <td>
                    <h3>Total:${total}</h3>
                  </td>
                </tr>
                <tr>
                  <table border="0" cellSpacing="10" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <Button onClick={() => history.goBack()} >Continue shopping</Button>
                        </td>
                        <td>
                          <Button onClick={()=> history.push('/payment')} >Checkout</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </tr>
              </table>
            </tr>
          </tbody>
        </table>
      ) : 
      (
        <p>{errMsg}</p>
      )
      }
      </div>
    </div>
  );
};

export default Checkout;
