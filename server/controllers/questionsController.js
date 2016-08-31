const models = require('../models/models.js');
const Question = models.Question;
const Tag = models.Tag;

const shortid = require('shortid');
const tagsController = require('./tagsController.js');
const sequelize = require('../db/db.js');
const Promise = require('bluebird');

//return all questions from the database
const getAllQuestions = function(req, res) {
  var queryString = `SELECT questions."id", questions."code",
                      questions."upvote", questions."downvote",
                      questions."createdAt", questions."url",
                      array_agg(tags."tag") as tags
                    FROM "questions" questions
                    JOIN "questiontags" qt
                    ON questions."id" = qt."questionId"
                    JOIN "tags" tags ON qt."tagId" = tags."id"
                    GROUP BY questions.id`;
  sequelize.query(queryString)
  .spread((questions, metadata) => {
    res.send(questions);
  })
  .catch(err => res.sendStatus(500));
};

//return all questions for a USER from the database
const getQuestionsForUser = function(req, res) {
  Question.findAll({
    where : { userId : req.query.uid }
  }).then(function(questions) {
    res.send(questions.map(question => {
      return question.dataValues
    }));
  });
};

//Get question video by code and send video to client
const getQuestion = function(req, res) {
  Question.findOne({ 
    where: { code: req.query.code } 
  }).then(function(question) {
    res.send(question.dataValues);
  });
};

//Create Question video with aws public url and uniq code
//Send code to client on success
const createQuestion = function(req, res) {
  var videoCode = shortid.generate();
  req.app.socket.broadcast.emit('makeQuestion', videoCode );
  Question.create({
    url: req.body.publicUrl,
    userId: req.body.userId,
    code: videoCode
  })
  .then(function(question) {
    var tags = req.body.tags || [];
    var postTags = tags.map(tag => {
      return tagsController.createTag(tag)
        .spread((tagEntry, created) => {
            return question.addTag(tagEntry.dataValues.id);
        })
    });
    Promise.all(postTags)
    .then(() => {
      var queryString = `SELECT questions."id", questions."code",
                          questions."upvote", questions."downvote",
                          questions."createdAt", questions."url",
                          array_agg(tags."tag") as tags
                        FROM "questions" questions
                        JOIN "questiontags" qt
                        ON questions."id" = qt."questionId"
                        JOIN "tags" tags ON qt."tagId" = tags."id"
                        WHERE questions."id" = ${question.dataValues.id}
                        GROUP BY questions."id"`;
      sequelize.query(queryString)
      .spread((questions, metadata) => {
        res.send(questions[0]);
      })
      .catch(err => res.sendStatus(500));
    });
  });
};

// update upvote or downvote for question
const updateQuestionVotes = function(req, res) {
  const body = req.body;
  Question.findOne({ where: {id: body.id} })
  .then(question => question.update({ [body.type]: body.value }))
  .then(question => res.json(question)) 
  .catch(err => res.sendStatus(500))
}

module.exports = {
  getAllQuestions: getAllQuestions,
  getQuestionsForUser: getQuestionsForUser,
  getQuestion: getQuestion,
  createQuestion: createQuestion,
  updateQuestionVotes
};
