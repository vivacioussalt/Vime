function answer(state = [], action) {
  const index = findIndex(state, item => item.code === action.answer.code);
  if (index === -1) {
    return state.concat([action.answer]);
  } else {
    return [...state.slice(0, index), action.answer, ...state.slice(index + 1)];
  } 
}

export default function answersOfQuestions(state = {}, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      var answers = state[action.questionCode] || [];
      return {...state, [action.questionCode]: answer(answers, action)};
/*
    if (state[action.questionCode]) {
      return {
        ...state,
        [action.questionCode]: state[action.questionCode].concat(action.answer)
      }      
    } else {
      return {
        ...state,
        [action.questionCode]: [action.answer]
      }
    }
*/
    case 'ADD_ALL_ANSWERS':
      return {
        ...state,
        [action.questionCode]: action.answers
        // action.answers must be formatted properly as an array of objects {answer.id: answer } 
      }
    default:
      return state;
  }
}

function findIndex(array, predicate) {
  for (var i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
}
