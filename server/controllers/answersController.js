var Answer = require('../models/models.js').Answer;
var Question = require('../models/models.js').Question;
var shortid = require('shortid');

//return all answers for a USER from the database
var getAnswersForUser = function(req, res) {
  Answer.findAll({
    where: { userId: req.query.uid }
  }).then(function(answers) {
    res.send(answers.map(answer => {
      return answer.dataValues
    }));
  });
};

//return all answers for a QUESTION from the database
var getAnswersForQuestion = function(req, res) {
  Answer.findAll({
    where: { questionId: req.query.questionId }
  }).then(function(answers) {
    res.send(answers.map(answer => {
      return answer.dataValues
    }));
  });
};

//Get answer video by code and send video to client
var getAnswer = function(req, res) {
  console.log('Getting ANSWER video with code:', req.query.code);
  Answer.findOne({ 
    where: { code: req.query.code } 
  }).then(function(answer) {
    res.send(answer.dataValues);
  });
};

//Create Answer video with aws public url and uniq code
//Send code to client on success
var createAnswer = function(req, res) {
  console.log('Creating ANSWER video with url:', req.body.publicUrl);
  Answer.create({
    url: req.body.publicUrl,
    userId: req.body.userId,
    questionId: req.body.questionId,
    code: shortid.generate()
  })
  .then(function(answer) {
    console.log('created ANSWER video:', answer);
    res.send(answer.dataValues);
  });
};


module.exports = {
  getAnswersForUser: getAnswersForUser,
  getAnswersForQuestion: getAnswersForQuestion,
  getAnswer: getAnswer,
  createAnswer: createAnswer
};
