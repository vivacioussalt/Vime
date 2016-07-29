import { push } from 'react-router-redux';
import { checkStatus, toJSON } from './fetchUtils';

export function addQuestion(question) {
  return {
    type: 'ADD_QUESTION',
    question
  }  
}

export function postQuestion(question){
  return function(dispatch) {
    dispatch(addQuestion(question));
    dispatch(push(`/qa/${question.code}`));
  }
}

function addAllQuestions(questions){
  return {
    type: 'ADD_ALL_QUESTIONS',
    questions
  }
}

export function getQuestions() {
  return function(dispatch) {
    return fetch('http://localhost:3000/api/questions')
      .then(checkStatus)
      .then(toJSON)
      .then(questions => {
        dispatch(addAllQuestions(questions))
      })
      .catch(err => console.warn('Error in getQuestions', err))
  }
}
