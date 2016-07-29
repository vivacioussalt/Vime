import { push } from 'react-router-redux';

function add(question) {
  return {
    type: 'ADD_QUESTION',
    question
  }  
}

function addQuestion(question){
  return function(dispatch) {
    dispatch(add(question));
    dispatch(push(`/qa/${question.code}`));
  }
}

export { addQuestion }