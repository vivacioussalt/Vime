import QuestionVideoGrid from './QuestionVideoGrid';
import AnswerVideoGrid from './AnswerVideoGrid';

const Profile = ({ user, questions, answers, goToTopic, setFilter }) => (
  <div>
    <div>
      <h2>{user.username}</h2>
    </div>
    <div className="container">
      <h3>My Questions</h3>
      <QuestionVideoGrid videos={questions} goToTopic={goToTopic} setFilter={setFilter} />
    </div>
    <div className="container">
      <h3>My Answers</h3>
      <AnswerVideoGrid videos={answers} setFilter={setFilter} />
    </div>
  </div>
);

export default Profile;
