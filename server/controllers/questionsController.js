var Question = require('../models/models.js').Question;
var shortid = require('shortid');

//return all questions from the database
var getAllQuestions = function(req, res) {
  Question.findAll().then(function(questions) {
    res.send(questions.dataValues);
  });
};

//return all questions for a USER from the database
var getQuestionsForUser = function(req, res) {
  Question.findAll({
    where : { userId : req.query.uid }
  }).then(function(questions) {
    res.send(questions.dataValues);
  });
};

//Get question video by code and send video to client
var getQuestion = function(req, res) {
  console.log('Getting QUESTION video with code:', req.query.code);
  Question.findOne({ 
    where: { code: req.query.code } 
  }).then(function(question) {
    res.send(question.dataValues);
  });
};

//Create Question video with aws public url and uniq code
//Send code to client on success
var createQuestion = function(req, res) {
  console.log('Creating QUESTION video with url:', req.body.publicUrl);
  Question.create({
    url: req.body.publicUrl,
    userId: req.body.userId,
    code: shortid.generate()
  })
  .then(function(question) {
    console.log('created QUESTION video:', question);
    res.send(question.dataValues);
  });
};


module.exports = {
  getAllQuestions: getAllQuestions,
  getQuestionsForUser: getQuestionsForUser,
  getQuestion: getQuestion,
  createQuestion: createQuestion
};
