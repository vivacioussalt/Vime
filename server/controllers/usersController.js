const { User, Question, Answer } = require('../models/models');

const existsMessage = 'Username exists/Incorrect password';

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
          console.log('Incorrect password for', user.dataValues.username);
          res.status(401).send(JSON.stringify(existsMessage));
        }
      })
    }
  })
  .catch(err => {
    console.log('Post user error', err);
    res.sendStatus(500);
  })
}

module.exports = {
  postUser: postUser
};
