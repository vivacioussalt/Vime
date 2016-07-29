import { addQuestion } from './questionAction';

function vote(prevValue, type, videoType, id) {
  return dispatch => {
    fetch(`http://localhost:3000/api/${videoType}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }, 
      body: {
        id,
        type,
        value: prevValue + 1,
      }
    }
    .then(question => dispatch(addQuestion(question)));
  }
}

export default vote;
