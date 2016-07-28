export default function answersOfQuestions(state = {}, action) {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        [action.questionId]: state[action.questionId].concat(action.answer)
      }
    case 'ADD_ALL_ANSWERS':
      return {
        ...state,
        [action.questionId]: action.answers
        // action.answers must be formatted properly as an array of objects {answer.id: answer } 
      }
    default:
      return state;
  }
}