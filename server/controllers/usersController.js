const User = require('../models/user');

const existsMessage = 'Username exists or incorrect password';
/*
function postUser(req, res) {
  const body = req.body;
  findOrCreate(body.username, body.password)
  .then(user => {
    res.json(user.dataValues);
  })
  .catch(err => {
    if (err.message === existsMessage) {
      res.json({message: existsMessage});
    } else {
      res.sendStatus(500);
    }
  });
}
*/
function postUser(req, res) {
  const body = req.body;
  User.findOrCreate({
    where: {username: body.username},
    defaults: {password: body.password}
  })
  .spread((user, created) => {
    if (created) {
      res.json(user.dataValues); 
    } else {
      user.comparePassword(body.password)
      .then(match => {
        if (match) {
          res.json(user.dataValues);
        } else {
          res.json({message: 'Username exists/Incorrect Password'});
        }
      })
    }
  })
  .catch(err => {
    console.log('Post user error', err);
    res.sendStatus(500);
  })
}

function findOrCreate(username, password) { 
  return User.findOne({ where: {username: username} })
    .then(user => {
      if (user) {
        return findUser(user, username, password);
      } else {
        return createUser(user, username, password);
      }
    })
    .catch(err => { throw err; });
}

function findUser(user, username, password) {
  return user.comparePassword(password)
    .then(match => {
      if (match) {
        return user;
      } else {
        throw new Error(existsMessage);
      }
    })
}

function createUser(user, username, password) {
  return User.create({ username: username, password: password });
}

module.exports = {
  postUser: postUser
};
