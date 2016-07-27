const User = require('../models/user');

function postUser(username, password) {
  return User.findOne({ where: {username: username} })
    .then(user => {
      if (user) {
        return getUser(user, username, password);
      } else {
        return createUser(user, username, password);
      }
    })
    .catch(err => { throw err; });
}

function getUser(user, username, password) {
  return user.comparePassword(password)
    .then(match => {
      if (match) {
        return user;
      } else {
        throw new Error('Username exits or incorrect password for ' + username);
      }
    })
}

function createUser(user, username, password) {
  return User.create({ username: username, password: password });
}

module.exports = {
  postUser: postUser
};
