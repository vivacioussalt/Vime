const db = require('../db/db.js');

const User = db.User;

function getUser(username, password) = {
  return User.findOne({ where: {username: username} })
    .then(user => user.comparePassword(password))
    .then(match => {
      if (match) {
        return user;
      } else {
        throw new Error('Password does not match for ' + username);
      }
    })
    .catch(err => { console.log('Database error', err); });
}

function createUser(username, password) {
  return User.findOne({ where: {username: username} })
    .then(user => {
      if (!user) {
        return User.create({ username: username, password: password });
      } else {
        throw new Error('Username already exists');
      }
    })
    .catch(err => { console.log('Database error', err); }) 
}

module.exports = {
  getUser: getUser,
  createUser: createUser
};
