import { push } from 'react-router-redux';
import { checkStatus, toJSON } from './fetchUtils';

function add(question) {
  return {
    type: 'ADD_QUESTION',
    question
  }  
}

export function addQuestion(question){
  return function(dispatch) {
    dispatch(add(question));
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
        console.log('dispatching ROUND2 add all questions');
        dispatch(addAllQuestions(questions))
      })
      .catch(err => console.warn('Error in getQuestions', err))
  }
}