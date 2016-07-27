const path = require('path');

const questionsController = require('./controllers/questionsController');
const videosController = require('./controllers/videosController');
const usersController = require('./controllers/usersController');
const router = require('express').Router();

router.get('/api/questions', questionsController.getQuestions);
router.post('/api/questions', questionsController.createQuestion);

router.get('/api/presigned', videosController.generatePreSignedUrl);
router.get('/api/videos', videosController.getVideo);
router.post('/api/videos', videosController.createVideo);

router.post('/api/login', usersController.postUser);

// Send homepage when users route to videos or record endpoint
// React Router will handle showing the appropriate views
router.get('/videos/*', (req, res) => { res.sendFile(path.resolve(__dirname + '/../../client/index.html')); });
router.get('/record', (req, res) => { res.sendFile(path.resolve(__dirname + '/../../client/index.html')); });

//TODO
//Handle unknown routes;
//router.get(*, errorHandler);

module.exports = router;
