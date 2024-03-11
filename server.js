//Process Payment
//Setting up Express backend server

//use dotenv file on the backend
require("dotenv").config()

const express = require("express");
const cors =  require("cors");
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => )
//get response and request
res.send("Welcome to eShop Website") //send response to server


// const calculateOrderAmount = (items) => {
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

const PORT = process.env.PORT || 4242
app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));



//run - yarn start:backend


