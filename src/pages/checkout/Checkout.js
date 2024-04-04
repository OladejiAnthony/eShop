import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_CART_TOTAL_QUANTITY,
  selectCartItems,
  selectCartTotalAmount,
  //CLEAR_CART,
} from "../../redux/slice/cartSlice";
import {
  selectEmail,
  //selectUserID,
  //selectUserName,
} from "../../redux/slice/authSlice";
import {
  selectBillingAddress,
  selectShippingAddress,
} from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { db } from "../../firebase/config";
 import { useNavigate } from "react-router-dom";
// import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS, selectOrderHistory } from "../../redux/slice/orderSlice";

 //use dotenv variable on frontend
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...")
  const [clientSecret, setClientSecret] = useState("");

  const navigate = useNavigate();

  //redux
  // const userID = useSelector(selectUserID);
  // const userEmail = useSelector(selectEmail);
  // const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const billingAddress = useSelector(selectBillingAddress);
  //const orderHistory = useSelector(selectOrderHistory)
  //console.log(billingAddress)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_CART_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  //stripe description
  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;
  console.log(description)

  //stripe implementation
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads with backend url:
    //https://eshop-react-firebase.herokuapp.com/create-payment-intent
    // http://localhost:4242/create-payment-intent
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
  // const today = new Date();
  // const date = today.toDateString();
  // const time = today.toLocaleTimeString();
  // const flutterConfig = {
  //   public_key: "FLWPUBK_TEST-6604afffe841f59e8c4b71ae98af54e4-X",
  //   tx_ref: Date.now(),
  //   amount: totalAmount,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     userID: userID,
  //     email: userEmail,
  //     orderDate: date,
  //     orderTime: time,
  //     orderAmount: cartTotalAmount,
  //     orderStatus: "Order Placed...",
  //     cartItems: cartItems,
  //     shippingAddress: shippingAddress,
  //     createdAt: Timestamp.now().toDate(),
  //   },
  //   customizations: {
  //     title: "eShop",
  //     description: "Payment for items in cart",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };
  // const handleFlutterPayment = useFlutterwave(flutterConfig);

  // const saveOrder = () => {
  //   try {
  //     // Add a new document with a generated id to the orders collection.
  //     addDoc(collection(db, "orders"), flutterConfig);
  //     console.log(addDoc)
  //     dispatch(CLEAR_CART()); //clear cart when order has beeen saved
  //     dispatch(STORE_ORDERS(flutterConfig.customer)); // Store the order in the Redux store
  //     dispatch(CALC_TOTAL_ORDER_AMOUNT([...orderHistory, flutterConfig.customer])); // Recalculate the total order amount
  //     toast.success("Order saved");
  //     //navigate to checkout successs page
  //     navigate("/checkout-success");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  // Fluterwave test card details:
  // Card number - 4187427415564246
  // CVV - 828
  // Expiry - 09/32
  // OTP - 123456
 
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
      {/* <div
        className="container"
        style={{ width: "100%", display: "flex", marginTop: "50px" }}
      >
        <h2>FlutterWave Payment:</h2>
        <button
          className="flutterwave"
          onClick={() =>
            handleFlutterPayment({
              callback: (response) => {
                console.log(response);
                if (response.status === "successful") {
                  saveOrder();
                }
                closePaymentModal();
              },
              onClose: () => {},
            })
          }
        >
          Pay
        </button>
      </div> */}
      
    </>
  );
};

export default Checkout;
