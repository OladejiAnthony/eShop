const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;


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

// Handle payment request
app.post('/pay', async (req, res) => {
  try {
    const { items, shipping, description, customer,cardDetails } = req.body;

    // Make request to Flutterwave API to initiate payment
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: 'unique_transaction_reference', // Generate a unique transaction reference
        payment_options: 'card',
        card: cardDetails, // Card details obtained from the frontend
        customer,
        amount: calculateOrderAmount(items),
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
      },
      {
        headers: {
          Authorization: 'Bearer {`process.env.YOUR_FLUTTERWAVE_SECRET_KEY`}',
        },
      }
    );

    // Handle response from Flutterwave API
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'An error occurred while processing payment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


