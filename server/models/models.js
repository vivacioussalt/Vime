const User = require('./user.js');
const Answer = require('./answer.js');
const Question = require('./question.js');
const Tag = require ('./tag.js');
const QuestionTag = require ('./questiontag.js');

//Setup relationships
Answer.belongsTo(User);
User.hasMany(Answer);

Question.belongsTo(User);
User.hasMany(Question);

Answer.belongsTo(Question);
Question.hasMany(Answer);

// const QuestionTag = sequelize.define('question_tag', {});
Question.belongsToMany(Tag, {through: 'questiontags'});
Tag.belongsToMany(Question, {through: 'questiontags'});


User.sync();
Answer.sync();
Question.sync();
Tag.sync();
QuestionTag.sync();

module.exports = {
  User: User,
  Answer: Answer,
  Question: Question,
  Tag: Tag,
  QuestionTag: QuestionTag
}
