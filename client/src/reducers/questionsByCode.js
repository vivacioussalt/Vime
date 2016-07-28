export default function questionsByCode(state = {}, action){
  switch (action.type){
    case 'ADD_QUESTION':
      return {
        ...state,
        [action.question.code]: {
          ...action.question
        }
      };
    default:
      return state;
  }
}