const axios = require("axios");
const Order = require("../models/Order");

exports.createOrder = async (req, res, next) => {
  try {
    const { items, amount, billingData } = req.body;
    console.log(req.user);

    const authResponse = await axios.post(
      "https://accept.paymobsolutions.com/api/auth/tokens",
      { api_key: process.env.Paymob_API_KEY }
    );
    const authToken = authResponse.data.token;

    // Register Order
    const orderResponse = await axios.post(
      "https://accept.paymobsolutions.com/api/ecommerce/orders",
      {
        auth_token: authToken,
        delivery_needed: "false",
        amount_cents: amount,
        currency: "EGP",
        items: items.map((item) => ({
          name: item.productId.name,
          amount_cents: item.productId.price,
          quantity: item.quantity,
        })),
      }
    );
    const orderId = orderResponse.data.id;

    // Get Payment Key
    const paymentKeyResponse = await axios.post(
      "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
      {
        auth_token: authToken,
        amount_cents: amount,
        currency: "EGP",
        order_id: orderId,
        billing_data: billingData,
        integration_id: "4830064",
      }
    );

    const paymentKey = paymentKeyResponse.data.token;

    // Return paymentKey and orderId to the client
    res.json({ paymentKey, orderId });
  } catch (error) {
    console.error(
      "Error during order creation:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send(error.response ? error.response.data : error.message);
  }
};

//after deploy

// const axios = require("axios");
// const Order = require("../models/Order");

// exports.createOrder = async (req, res, next) => {
//   try {
//     const { items, amount, billingData } = req.body;
//     console.log(req.user);

//     const authResponse = await axios.post(
//       "https://accept.paymobsolutions.com/api/auth/tokens",
//       { api_key: process.env.Paymob_API_KEY }
//     );
//     const authToken = authResponse.data.token;

//     // Register Order
//     const orderResponse = await axios.post(
//       "https://accept.paymobsolutions.com/api/ecommerce/orders",
//       {
//         auth_token: authToken,
//         delivery_needed: "false",
//         amount_cents: amount * 100,
//         currency: "EGP",
//         items: items.map((item) => ({
//           name: item.productId.name,
//           amount_cents: item.productId.price * 100,
//           quantity: item.quantity,
//         })),
//       }
//     );
//     const orderId = orderResponse.data.id;

//     // Get Payment Key
//     const paymentKeyResponse = await axios.post(
//       "https://accept.paymobsolutions.com/api/acceptance/payment_keys",
//       {
//         auth_token: authToken,
//         amount_cents: amount * 100,
//         currency: "EGP",
//         order_id: orderId,
//         billing_data: billingData,
//         integration_id: "4830064",
//       }
//     );

//     const paymentKey = paymentKeyResponse.data.token;

//     // Return paymentKey and orderId to the client
//     res.json({ paymentKey, orderId });
//   } catch (error) {
//     console.error(
//       "Error during order creation:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).send(error.response ? error.response.data : error.message);
//   }
// };

// exports.handlePaymobWebhook = async (req, res) => {
//   const { obj } = req.body;
//   const { id: paymentId, success } = obj;

//   if (success) {
//     // Payment was successful, update order status
//     const order = await Order.findOne({ paymentId: paymentId });
//     if (order) {
//       order.isPaid = true;
//       await order.save();
//       res.status(200).json({ received: true });
//     } else {
//       res.status(404).json({ error: "Order not found" });
//     }
//   } else {
//     // Payment failed, handle accordingly
//     res.status(400).json({ error: "Payment failed" });
//   }
// };
