function questions(state = [], action) {
  switch(action.type) {
    case 'ADD_USER_QUESTION':
      return [...state, action.questionId];
    default:
      return state;
  }
}

function answers(state = [], action) {
  switch(action.type) {
    case 'ADD_USER_ANSWER':
      return [...state, action.answer]; 
    default:
      return state;
  }
}

export default function user(state = null, action) {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return action.user;
    case 'ADD_USER_QUESTION':
      return
    case 'ADD_USER_ANSWER':
      
    default:
      return state;
  }
} 
