var db = require('../db/db.js');
var shortid = require('shortid');

//return all answers from the database
var getAnswers = function(req, res) {
  db.Answer.findAll().then(function(answers) {
    res.send(answers);
  });
};

//Get answer video by code and send video to client
var getAnswer= function(req, res) {
  console.log('Getting ANSWER video with code:', req.query.code);
  db.Answer.findOne({ 
    where: { code: req.query.code } 
  }).then(function(answer) {
    res.send(answer);
  });
};

//Create Answer video with aws public url and uniq code
//Send code to client on success
var createAnswer = function(req, res) {
  console.log('Creating ANSWER video with url:', req.body.publicUrl);
  db.Answer.create({
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
  getAnswers: getAnswers,
  createAnswer: createAnswer
};