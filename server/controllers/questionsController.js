const Question = require('../models/models.js').Question;
const shortid = require('shortid');
const tagsController = require('./tagsController.js');
const sequelize = require('../db/db.js');

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
  console.log('Getting QUESTION video with code:', req.query.code);
  Question.findOne({ 
    where: { code: req.query.code } 
  }).then(function(question) {
    res.send(question.dataValues);
  });
};

//Create Question video with aws public url and uniq code
//Send code to client on success
const createQuestion = function(req, res) {
  console.log('');
  req.app.socket.broadcast.emit('makeQuestion', 'Someone made a question!');
  console.log('');
  console.log('Creating QUESTION video with url:', req.body.publicUrl);
  console.log('question tags', req.body.tags);
  Question.create({
    url: req.body.publicUrl,
    userId: req.body.userId,
    code: shortid.generate()
  })
  .then(function(question) {
    var tags = req.body.tags;
    if (tags.length) {
      tags.forEach((tag) => {
        tagsController.createTag(tag)
        .spread((tagEntry, created) => {
            question.addTag(tagEntry.dataValues.id);
          // console.log('what is in this tagEntry?', tagEntry.dataValues);
          // if (created) {
            // console.log('already created this tag, what is in it?', tagEntry.dataValues);
          // }
        })
          // if (created) {
          // } else {
            
      })
    }

    console.log('created QUESTION video:', question);
    res.send(question.dataValues);
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
