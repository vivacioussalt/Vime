const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('answer', {
  code: Sequelize.STRING,
  url: Sequelize.STRING,
  upvote: { type: Sequelize.INTEGER, defaultValue: 0 },
  downvote: { type: Sequelize.INTEGER, defaultValue: 0 }
});
