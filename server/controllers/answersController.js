const models = require('../models/models.js');
const Answer = models.Answer;
const Question = models.Question;
const shortid = require('shortid');

//return all answers for a USER from the database
const getAnswersForUser = function(req, res) {
  Answer.findAll({
    where: { userId: req.query.uid }
  }).then(function(answers) {
    res.send(answers.map(answer => {
      return answer.dataValues
    }));
  });
};

//return all answers for a QUESTION from the database
const getAnswersForQuestion = function(req, res) {
  Answer.findAll({
    where: { questionId: req.query.questionId }
  }).then(function(answers) {
    res.send(answers.map(answer => {
      return answer.dataValues
    }));
  });
};

//Get answer video by code and send video to client
const getAnswer = function(req, res) {
  Answer.findOne({ 
    where: { code: req.query.code } 
  }).then(function(answer) {
    res.send(answer.dataValues);
  });
};

//Create Answer video with aws public url and uniq code
//Send code to client on success
const createAnswer = function(req, res) {
  Answer.create({
    url: req.body.publicUrl,
    userId: req.body.userId,
    questionId: req.body.questionId,
    code: shortid.generate()
  })
  .then(function(answer) {
    res.send(answer.dataValues);
  });
};

// update upvote or downvote for answer 
const updateAnswerVotes = function(req, res) {
  const body = req.body;
  Answer.findOne({ where: {id: body.id} })
  .then(answer => answer.update({ [body.type]: body.value }))
  .then(answer => { 
    Question.findOne({ attributes: ['code'], where: {id: body.questionId} })
    .then(question => res.json({answer: answer, questionCode: question.code}))
  }) 
  .catch(err => res.sendStatus(500))
}

module.exports = {
  getAnswersForUser: getAnswersForUser,
  getAnswersForQuestion: getAnswersForQuestion,
  getAnswer: getAnswer,
  createAnswer: createAnswer,
  updateAnswerVotes: updateAnswerVotes
};
