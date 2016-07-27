var db = require('../db/db.js');
var shortid = require('shortid');

//return all questions from the database
var getQuestions = function(req, res) {
  db.Question.findAll().then(function(questions) {
    res.send(questions);
  });
};

//Get question video by code and send video to client
var getQuestion= function(req, res) {
  console.log('Getting QUESTION video with code:', req.query.code);
  db.Question.findOne({ 
    where: { code: req.query.code } 
  }).then(function(question) {
    res.send(question);
  });
};

//Create Question video with aws public url and uniq code
//Send code to client on success
var createQuestion = function(req, res) {
  console.log('Creating QUESTION video with url:', req.body.publicUrl);
  db.Question.create({
    url: req.body.publicUrl,
    code: shortid.generate()
  })
  .then(function(question) {
    console.log('created QUESTION video:', question);
    res.send({
      success: 'Question video created',
      code: question.code
    });
  });
};


module.exports = {
  getAnswers: getAnswers,
  createAnswer: createAnswer
};