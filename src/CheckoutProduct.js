import React from "react";
import "./CheckoutProduct.css";
import { UseStateValue } from "./StateProvider";
import reducer from "./reducer";

function CheckoutProduct({ id, image, title, price, rating }) {
  const [{ basket }, dispatch] = UseStateValue();
  const RemoveFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", id: id });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct_image" src={image} />

      <div className="checkoutProduct_infor">
        <p className="checkoutProduct_title">{title}</p>
        <p className="checkoutProduct_price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct_rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>😇</p>
            ))}
        </div>
        <button onClick={RemoveFromBasket}>Remove from Basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
