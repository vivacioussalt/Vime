const { User } = require('../models/models');
const request = require('request');
require('dotenv').config();
var stripe = require('stripe')(process.env.STRIPE_API_KEY);

var processDonation = function(req, res) {
  User.findOne({ where: { id: req.body.userId } })
  .then(function(user) {
    stripe.charges.create({
      amount: req.body.amount,
      currency: 'usd',
      source: req.body.stripeToken,
      destination: user.dataValues.stripeId
      // 'acct_18cMqjHSob4JtQzi' //stripe user id to get donations
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        console.log('Donation has been declined');
        res.send(req.body);
      } else {
        console.log(req.body);
        console.log('Donation successful');
        res.send(req.body);
      } 
    });    
  });
};

var getStripeId = function(req, res) {

  User.findOne({ where: { id: req.body.userId } }).then(function(user) {
    user.updateAttributes({ stripeId: req.body.stripeId });
  })
  .then(function(updatedUser) {
    console.log(updatedUser);
  });
};


exports.processDonation = processDonation;
exports.getStripeId = getStripeId;

