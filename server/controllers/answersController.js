var Answer = require('../models/models.js').Answer;
var shortid = require('shortid');

//return all answers for a USER from the database
var getAnswersForUser = function(req, res) {
  Answer.findAll({
    where: { userId: req.query.uid }
  }).then(function(answers) {
    res.send(answers);
  });
};

//return all answers for a QUESTION from the database
var getAnswersForQuestion = function(req, res) {
  Answer.findAll({
    where: { questionId: req.query.qid }
  }).then(function(answers) {
    res.send(answers);
  });
};

//Get answer video by code and send video to client
var getAnswer= function(req, res) {
  console.log('Getting ANSWER video with code:', req.query.code);
  Answer.findOne({ 
    where: { code: req.query.code } 
  }).then(function(answer) {
    res.send(answer);
  });
};

//Create Answer video with aws public url and uniq code
//Send code to client on success
var createAnswer = function(req, res) {
  console.log('Creating ANSWER video with url:', req.body.publicUrl);
  Answer.create({
    url: req.body.publicUrl,
    code: shortid.generate()
  })
  .then(function(answer) {
    console.log('created ANSWER video:', answer);
    res.send({
      success: 'Answer video created',
      code: answer.code
    });
  });
};


module.exports = {
  getAnswersForUser: getAnswersForUser,
  getAnswersForQuestion: getAnswersForQuestion,
  getAnswer: getAnswer,
  createAnswer: createAnswer
};