export default function answersOfQuestions(state = {}, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
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