import { push } from 'react-router-redux';
import { checkStatus, toJSON } from './fetchUtils';

function addAnswer({questionCode, answer}) {
  return {
    type: 'ADD_ANSWER',
    questionCode,
    answer
  }
}

function postAnswer({questionCode, answer}) {
  return function(dispatch) {
    dispatch(addAnswer({questionCode, answer}));
    dispatch(push(`/qa/${questionCode}`));
  }
}

function addAllAnswers(code, answers) {
  return {
    type: 'ADD_ALL_ANSWERS',
    questionCode: code,
    answers
  }
}

function getAnswersForQuestion(id, code) {
  return function(dispatch) {
    return fetch(`/api/answers?questionId=${id}`)
    .then(checkStatus)
    .then(toJSON)
    .then(answers => {
      console.log(answers);
      dispatch(addAllAnswers(code, answers));
      dispatch(push(`/qa/${code}`));
    })
    .catch(err => console.warn('error in getAnswers', err))
  }
}

export { addAnswer, postAnswer, addAllAnswers, getAnswersForQuestion };
