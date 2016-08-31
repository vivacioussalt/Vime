const db = require('./db/db');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const socket = require('socket.io');
const path = require('path');

const stripeHandler = require('./utility/stripeHandler');

const app = express();


app.use(express.static(__dirname + '/../client/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use router for accessing db 
// https://expressjs.com/en/guide/routing.html
app.use('/api', router);

// route for stripe processing
app.post('/api/stripe', stripeHandler.processDonation);
app.post('/api/stripe/id', stripeHandler.getStripeId);

// serve index.html for rest
app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname + '/../client/public/index.html'));
});

const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log('we are listening!');
});


const io = socket(server);
io.on('connection', function(socket){
  app.socket=socket;
  socket.on('disconnect', function(){
    console.log('\nUSER DISCONNECTED\n');
  })
  socket.on('some message', function(msg){
    console.log('A client sent you a msg:', msg);
    socket.broadcast.emit('someone else','hi');
  });
});
