import { push } from 'react-router-redux';
import { checkStatus, toJSON } from './fetchUtils';


function add({questionCode, answer}) {
  return {
    type: 'ADD_ANSWER',
    questionCode,
    answer
  }
}


function addAnswer({questionCode, answer}) {
  return function(dispatch) {
    dispatch(add({questionCode, answer}));
    dispatch(push(`/qa/${questionCode}`));
  }
}

function addAllAnswers(answers) {
  return {
    type: 'ADD_ALL_ANSWERS',
    answers
  }
}

// export function getQuestions() {
//   return function(dispatch) {
//     return fetch('http://localhost:3000/api/questions')
//       .then(checkStatus)
//       .then(toJSON)
//       .then(questions => {
//         dispatch(addAllQuestions(questions))
//       })
//       .catch(err => console.warn('Error in getQuestions', err))
//   }
// }

// fetch('/api/answers', {
//   method: 'GET',
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     code: ,
//   })
// })

function getAnswers() {
  return function(dispatch) {
    return fetch('http://localhost/api/answers')
      .then(res => {
        if (!res.ok) {
          console.warn('error in getAnswers fetch', res.statusText);
        }
        var answers = res.json()
        return answers;
      })
      .then(answers => dispatch(addAllAnswers(answers)))
      .catch(err => console.warn('error in getAnswers', err))
  }
}

export { addAnswer, addAllAnswers, getAnswers };