const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('question', {
  code: Sequelize.STRING,
  url: Sequelize.STRING,
  upvote: { data: Sequelize.INTEGER, defaultValue: 0 },
  downvote: { data: Sequelize.INTEGER, defaultValue: 0 }
});
