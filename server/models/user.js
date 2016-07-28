const Sequelize = require('sequelize');
const Promise = require('bluebird');
const bcrypt = require('bcryptjs');

const db = require('../db/db.js');

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  instanceMethods: {
    comparePassword: function(password) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, match) => {
          if (err) {
            console.log('Error comparing passwords');
            reject(err);
          }
          resolve(match);
        });
      })
    },
    toJSON: function() {
      var values = this.get();
      delete values.password;
      return values;
    }
  }
});

// make sure to hash the password before creating model
User.beforeCreate((user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.dataValues.password, 10, (err, hash) => {
      if (err) {
        console.log('Error hashing password');
        reject(err);
      }
      user.dataValues.password = hash;
      resolve(hash);
    });
  })
});

module.exports = User;
