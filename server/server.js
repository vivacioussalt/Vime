const db = require('./db/db');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const stripeHandler = require('./utility/stripeHandler');

const app = express();

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router for accessing db 
// https://expressjs.com/en/guide/routing.html
app.use('/api', router);

// route for stripe processing
app.post('/stripe', stripeHandler.processDonation);
app.get('/stripe/callback', stripeHandler.getStripeId);

// serve index.html for rest
router.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('we are listening!');
});

io.on('connection', function(socket){
  console.log('\nUSER CONNECTED\n');
  app.socket=socket;
  socket.on('disconnect', function(){
    console.log('\nUSER DISCONNECTED\n');
  })
  socket.on('some message', function(msg){
    console.log('A client sent you a msg:', msg);
    console.log('Let\'s tell everyone else hi');
    socket.broadcast.emit('someone else','hi');
  });
});
