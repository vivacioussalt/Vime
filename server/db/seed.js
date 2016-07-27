var db = require('./db.js');
const User = db.User;

User.create({username: 'Louise', password: 'Belcher'})
  .then(() => User.findOne({username: 'Louise'}))
  .then(user => user.comparePassword('lcher'))
  .then(match => { console.log(match); })
