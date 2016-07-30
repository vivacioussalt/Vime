var db = require('./db/db');
var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes');

var app = express();

app.use(express.static(__dirname + '/../client/public'));
app.port = process.env.PORT || 3000;

var server = app.listen(app.port, function() {
  console.log('we are listening!');
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('USER CONNECTED');
  socket.on('disconnect', function(){
    console.log('USER DISCONNECTED ~~~~~~~~~~~~~');
  })
  socket.on('some message', function(msg){
    socket.broadcast.emit('someone else','hi');
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware for routes
//https://expressjs.com/en/guide/routing.html
app.use('/', router);

app.use(bodyParser.json()); 

