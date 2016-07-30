const User = require('./user.js');
const Answer = require('./answer.js');
const Question = require('./question.js');
const Tag = require ('./tag.js');

//Setup relationships
Answer.belongsTo(User);
User.hasMany(Answer);

Question.belongsTo(User);
User.hasMany(Question);

Answer.belongsTo(Question);
Question.hasMany(Answer);

// const QuestionTag = sequelize.define('question_tag', {});
Question.belongsToMany(Tag, {through: 'QuestionTag'});
Tag.belongsToMany(Question, {through: 'QuestionTag'});


User.sync();
Answer.sync();
Question.sync();
Tag.sync();
// QuestionTag.sync();

module.exports = {
  User: User,
  Answer: Answer,
  Question: Question,
  Tag: Tag
  // QuestionTag: QuestionTag
}
