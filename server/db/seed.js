var db = require('./db.js');
const models = require('../models/models');
const User = models.User;

User.create({username: 'Louise', password: 'Belcher'})
  .then(() => User.findOne({username: 'Louise'}))
  .then(user => user.comparePassword('lcher'))
  .then(match => { console.log(match); })
