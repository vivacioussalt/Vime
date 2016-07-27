//Using either MySQL or PostgreSQL, create a database for this project
//Default database is named greenfield
// CREATE DATABASE greenfield;

// We are using postgres database for production in heroku
// Download that here: http://postgresapp.com/ or install via home brew 
// Then click open psql in the menu bar 

var Sequelize = require('sequelize'); 
require('dotenv').config();


var db = new Sequelize(process.env.DATABASE_URL, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: process.env.DATABASE_URL.split(':')[2],
  dialectOptions: {
    ssl: true,
  }
});


// TODO implement User and User Auth
var User = db.define('user', {
  username: Sequelize.STRING, 
  password: Sequelize.STRING,
//   partnerId: Sequelize.INTEGER   
});

var Answer = db.define('answer', {
  //Create a unique alphanumeric id
  code: Sequelize.STRING,
  url: Sequelize.STRING
  //Allow for users to only be viewed by intended receiver
  // receiverId: Sequelize.INTEGER  
});


//Setup User Video relationship
Answer.belongsTo(User); 
User.hasMany(Answer);

var Question = db.define('question', {
  code: Sequelize.STRING,
  url: Sequelize.STRING
  // Allow for certain users to receive specific questions
  // receiverId: Sequelize.INTEGER 
});

Question.belongsTo(User);
User.hasMany(Question);

Answer.belongsTo(Question);
Question.hasMany(Answer);


//Allow for users to create questions, setup relationship between user and questions
// Question.belongsTo(User); 
// User.hasMany(Question); 

// User.sync(); 
User.sync(); 
Question.sync(); 
Answer.sync();

module.exports = {
  Answer: Answer, 
  Question: Question,
  User: User
}