import React from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../../forms/Button";
import {useDispatch} from 'react-redux'
import { addProduct } from "../../../redux/Cart/cart.action";

const Product = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    productThumbnail,
    productName,
    productPrice,
    documentID,
  } = product
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === "undefined"
  ) {
    return null;
  }

  const configAddToCartBtn = {
    type: "button",
  };

  const handleAddToCart= (product)=>{
    if(!product) return;
    dispatch(addProduct(
      product
    ))
    history.push('/cart')
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <Link to={`/product/${documentID}`}>
              <span className="name"> {productName}</span>
            </Link>
          </li>
          <li>
            <span className="price"> ${productPrice}</span>
          </li>
          <li>
            <div className="addToCart">
              <Button onClick={()=> handleAddToCart(product)} {...configAddToCartBtn}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
