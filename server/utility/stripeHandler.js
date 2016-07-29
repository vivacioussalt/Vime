const request = require('request');
require('dotenv').config();
var stripe = require('stripe')(process.env.STRIPE_API_KEY); // api secret key

var processDonation = function(req, res) {
  stripe.charges.create({
    amount: 800, // amount in cents
    currency: 'usd',
    source: req.body.stripeToken,
    destination: 'acct_18cMqjHSob4JtQzi' //stripe user id to get donations
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
    // The card has been declined
    // redirect user with error message
      console.log('Donation has been declined');
      res.send(req.body);
    } else {
    // redirect user letting them know successful
      console.log('Donation successful');
      res.send(req.body);
    } 
  });
};

var getStripeId = function(req, res) {
  console.log('inside stripe callback handler');
  var code = req.query.code;

  request.post({
    url: 'https://connect.stripe.com/oauth/token',
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.STRIPE_CLIENT_ID, // stripe client id
      code: code,
      client_secret: process.env.STRIPE_API_KEY // stripe secret api_key
    }
  }, function(err, response, body) {

    // we will want to save the user's stripe id 
    console.log(JSON.parse(body).stripe_user_id); // save this to the user database as stripe id
    res.send(JSON.parse(body));
    // redirect user to another page after we get their id
  });
};


exports.processDonation = processDonation;
exports.getStripeId = getStripeId;

