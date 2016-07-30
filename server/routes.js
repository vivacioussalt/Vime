const path = require('path');

const questionsController = require('./controllers/questionsController');
const answersController = require('./controllers/answersController');
const generatePreSignedUrl = require('./utility/generatePreSignedUrl');
const usersController = require('./controllers/usersController');

const router = require('express').Router();

router.get('/questions', questionsController.getAllQuestions);
router.post('/questions', questionsController.createQuestion);
router.put('/questions', questionsController.updateQuestionVotes);

router.get('/question', questionsController.getQuestion);

router.get('/answers', answersController.getAnswersForQuestion);
router.post('/answers', answersController.createAnswer);
router.put('/answers', answersController.updateAnswerVotes);

router.post('/api/stripe', stripeHandler.processDonation);
router.post('/api/stripe/id', stripeHandler.getStripeId);

router.get('/presigned', generatePreSignedUrl);

router.post('/login', usersController.postUser);

module.exports = router;
