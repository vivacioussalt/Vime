// using reducer composition

function questions(state = [], action) {
  return [...state, action.questionId];
}

function answers(state = [], action) {
  return [...state, action.answer]; 
}

export default function user(state = null, action) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return action.user;
    case 'ADD_USER_QUESTION':
      return {...state, questions: questions(state.questions, action)};
    case 'ADD_USER_ANSWER':
      return {...state, answers: answers(state.answers, action)}; 
    default:
      return state;
  }
} 
