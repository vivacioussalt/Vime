import React from 'react';
import QuestionVideoGrid from './QuestionVideoGrid';
import AnswerVideoGrid from './AnswerVideoGrid';

const Profile = ({ user, questions, answers, fetchAnswers }) => (
  <div>
    <div>
      <h2>{user.username}</h2>
    </div>
    <div className="container">
      <h3>My Questions</h3>
      <QuestionVideoGrid videos={questions} fetchAnswers={fetchAnswers} />
    </div>
    <div className="container">
      <h3>My Answers</h3>
      <AnswerVideoGrid videos={answers} />
    </div>
  </div>
);

export default Profile;
