const express = require('express');
const app = express();
const secret = require('./secrets.js');

const Stripe = require('stripe');
const stripe = Stripe(secrets.key);

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'poetry book',
          },
          unit_amount: 5490,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://brsbl.com/success.html',
    cancel_url: 'https://brsbl.com/book.html'
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log(`Listening on port ${4242}!`));
