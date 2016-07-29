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

function addAllQuestions(questions){
  return {
    type: 'ADD_ALL_QUESTIONS',
    questions
  }
}

function getQuestions() {
  return function(dispatch) {
    return fetch('http://localhost/api/questions')
      .then(res => {
        if (!res.ok) {
          console.warn('Error in getQuestions fetch', res.statusText);
        }
        console.log('questions are', res.json());
        return res.json();
      })
      .then(questions => dispatch(addAllQuestions(questions)))
      .catch(err => console.warn('error in getQuestions', err))
  }
}

export default { addQuestion, getQuestions }
