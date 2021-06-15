import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { UseStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = UseStateValue();
  return (
    <div className="Checkout">
      <div className="Checkout_Left">
        <img
          className="Checkout_Ad"
          src="https://images-na.ssl-images-amazon.com/images/G/01/ape/static/fallback/US_CENTER_PROMO_BACKUP._CB1578606135_.jpg"
          alt=""
        />

        <div>
          <h3>Hello,{user.email}</h3>
          <h2 className="Checkout_Title">Your Shopping Basket</h2>

          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
          {/* CheckoutProduct */}
          {/* CheckoutProduct */}
          {/* CheckoutProduct */}
          {/* CheckoutProduct */}
          {/* CheckoutProduct */}
        </div>
      </div>

      <div className="Checkout_Right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
