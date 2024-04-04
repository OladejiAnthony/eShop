//Process Stripe Payment
//Setting up Express backend server

//use dotenv file on the backend
require("dotenv").config()

const express = require("express");
const cors =  require("cors");
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY); //locate strive-pk in dotenv file


const app = express();
app.use(cors());
app.use(express.json());

//Production rule
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}
//yarn run build


//Backend Homepage
app.get("/", (req, res) => {
    //get response and request
    res.send("Welcome to eShop Website.") //send response to server
} )




//calculate order amount in the backend
const array = [];
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount.
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client.
  //console.log(action.payload);
  items.map((item) => {
    const { price, cartQuantity } = item; //destructuring
    const cartItemAmount = price * cartQuantity;
    //console.log(cartItemAmount);
    return array.push(cartItemAmount); //push cartItemAmount to the created arrray
  });
  //console.log(array);
  const totalAmount = array.reduce((a, b) => {
    return a + b; //add the values inside the array
  }, 0);
  //console.log(totalAmount)
  

  return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, shipping, description } = req.body; //destructure frontend fetch request body properties (from checkout.js)
console.log(req.body)
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description,
    shipping: {
      address: {
        line1: shipping.line1,
        line2: shipping.line2,
        city: shipping.city,
        country: shipping.country,
        postal_code: shipping.postal_code
      },
      name: shipping.name,
      phone: shipping.phone,
      //receipt_email: customerEmail
    }
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

//console display
//run - yarn start:backend
const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
//server localhost - localhost:4242


//Payment Logic implementation: From Checkout file to Server file to CheckoutForm file.

