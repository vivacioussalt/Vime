export default function questionsByCode(state = {}, action){
  switch (action.type){
    case 'ADD_QUESTION':
      return {
        ...state,
        [action.question.code]: {
          ...action.question
        }
      };
    case 'ADD_All_QUESTIONS':
      return 
        action.questions.reduce((accum, question) => {
          accum[question.code] = question;
          return accum;
        }, {});
    default:
      return state;
  }
}