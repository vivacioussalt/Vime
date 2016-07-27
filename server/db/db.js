//Using either MySQL or PostgreSQL, create a database for this project
//Default database is named greenfield
// CREATE DATABASE greenfield;

// We are using postgres database for production in heroku
// Download that here: http://postgresapp.com/ or install via home brew 
// Then click open psql in the menu bar 

var Sequelize = require('sequelize'); 
require('dotenv').config();

const db = new Sequelize(process.env.DATABASE_URL, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: process.env.DATABASE_URL.split(':')[2],
  dialectOptions: {
    ssl: true,
  }
});

module.exports = db;
