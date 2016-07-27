const User = require('./user.js');
const Answer = require('./answer.js');
const Question = require('./question.js');

//Setup relationships
Answer.belongsTo(User);
User.hasMany(Answer);

Question.belongsTo(User);
User.hasMany(Question);

Answer.belongsTo(Question);
Question.hasMany(Answer);

User.sync();
Answer.sync();
Question.sync();

module.exports = {
  User: User,
  Answer: Answer,
  Question: Question
}
