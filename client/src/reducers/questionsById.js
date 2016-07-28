export default function questionsById(state = {}, action){
  switch (action.type){
    case 'ADD_QUESTION':
      return {
        ...state,
        [action.question.id] : {
          ...action.question
        }
      };
    default:
      return state;
  }
}