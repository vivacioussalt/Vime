const Sequelize = require('sequelize');
const db = require('../db/db.js');

module.exports = db.define('questiontag', {
  questionId: Sequelize.INTEGER,
  tagId: Sequelize.INTEGER
});
