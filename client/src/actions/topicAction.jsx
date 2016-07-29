import { push } from 'react-router-redux';
import { getAnswers } from './answerActions.jsx';



function goToTopic(code) {
  return function(dispatch) {
    // dispatch(getAnswers(code));
    // dispatch(push(`/qa/${question.code}`));
  }
}