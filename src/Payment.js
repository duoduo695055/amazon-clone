import React,{useState}from 'react';
import { useEffect } from "react";
import './Payment.css';
import { UseStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct';
import { Link,useHistory} from "react-router-dom";
import {CardElement, useStripe,useElements} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";



function Payment() {
    const [{ basket, user }, dispatch] = UseStateValue();
    const history=useHistory();

    const stripe=useStripe();
    const elements=useElements();

    const [error,setError] =useState(null);
    const [disabled,setDisabled]=useState(true);

    const [processing, setProcessing]=useState("");
    const [succeeded, setSucceeded]=useState(false);

    const [clientSecret,setClientSecret]=useState(true);
    
    useEffect(() => {
        //generate the special stripe secret which allows us to charge a customer
        const getClientSecret =async() =>{
            const response= await axios({
                method:'post',
                url:`/payments/create?total=${getBasketTotal(basket) *100}`
            });
            setClientSecret(response.data.clientSecret)

        }

        getClientSecret();
    },[basket])

    console.log('THE SECRET IS>>>', clientSecret)

    const handleSubmit=async(event)=>{
        //do all the fancy stripe stuff 
        event.preventDefault();
        setProcessing(true);

        const payload=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) =>{

                //PaymentIntent =payment confirmation 
                setSucceeded(true);
                setError(null)
                setProcessing(false)

                history.replace('/orders')


            })
        }
    const handleChange = event=>{
        //listen for changes in the CardElement
        // and display any errors as the customer types their card details 
        setDisabled(event.empty);
        setError(event.error?event.error.message:"");

    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length}items</Link>)
                </h1>
                {/* payment_section:delivery address */}
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delievery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>6103 Webb Bridge Ct</p>
                        <p>Alpharetta, GA,30009</p>

                    </div>

                </div>

                {/* payment_section:review_item */}
                <div className="payment_section">
                    <div className='payment_title'>
                        <h3>Review Item and Delivery</h3>
                    </div>
                    <div className='payment_items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating} 
                                />
                        ))}

                    </div>

                </div>

                {/* paymen_section:method */}
                <div className="payment_section">
                    <div className='payment_title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div classNamee='payment_pricecontainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total:{value}</h3>)}
          
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                             />
                                <button disabled={processing || disabled || succeeded}>
                                <span>{processing?<p>Processing</p>:"Buy Now"}</span>
                                </button>
                            </div>
                               {error &&<div>{error}</div>}
                        </form>


                    </div>

                </div>

            </div>

        </div>
    )
}

export default Payment

