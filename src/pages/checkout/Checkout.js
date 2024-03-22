import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_CART_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectEmail, selectUserName } from "../../redux/slice/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";

//use dotenv variable on frontend
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  //redux
  const userName = useSelector(selectUserName);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);

  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads with backend url:
    //https://eshop-react-firebase.herokuapp.com/create-payment-intent
    // http://localhost:4242/create-payment-intent
    fetch("http://localhost:4242/create-payment-intent", {
      //an intention to make a payment from backend, fetch request to the backend server
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //we are sending this requests to the backend server
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } //else
        return res.json().then((json) => Promise.reject(json)); //reject promise - cancel the process
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  //flutterwave
  const config = {
    public_key: process.env.YOUR_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: Date.now(),
    amount: 100,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
      phone_number: '070********',
      name: 'john doe',
    },
    // public_key: process.env.YOUR_FLUTTERWAVE_PUBLIC_KEY,
    // tx_ref: Date.now(),
    // amount: totalAmount,
    // currency: "NGN",
    // payment_options: "card,mobilemoney,ussd",
    // customer: {
    //   email: customerEmail,
    //   name: userName,
    //   items: cartItems,
    //   shipping: shippingAddress,
    //   billing: billingAddress,
    //   description,
    // },
    customizations: {
      title: "My store",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };
  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      console.log(response);
      closePaymentModal(); // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
       {/*Flutterwave */}
       <div style={{width: "100%", marginLeft: "10%", margin: "50px"}}>
        <h1>FlutterWave Payment:</h1>
          <FlutterWaveButton {...fwConfig} />
      </div>

     
    </>
  );
};

export default Checkout;
