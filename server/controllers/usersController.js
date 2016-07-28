const { User, Question, Answer } = require('../models/models');

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
      res.status(401).send(JSON.stringify(existsMessage));
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
      res.json(Object.assign({}, user.toJSON(), {questions: [], answers: []})); 
    } else {
      user.comparePassword(body.password)
      .then(match => {
        if (match) {
          const id = user.dataValues.id;
          var getUserVideos = [
            Question.findAll({
              attributes: ['id'],
              where: {userId: id}
            }),
            Answer.findAll({ where: {userId: id} })
          ];
          Promise.all(getUserVideos)
          .then(userVideos => {
            res.json(Object.assign({}, user.toJSON(), {question: userVideos[0].map(video => video.id), answers: userVideos[1]}))
          })
          .catch(err => {
            console.log('Error getting user videos information', err);
            res.sendStatus(500);
          })
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
