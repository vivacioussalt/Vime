import { routerReducer } from 'react-router-redux';

import questionsById from './questionsById';
//import answersOfQuestion from './answersOfQuestion';

const rootReducer = combineReducers({
  questionsById,
  routing: routerReducer
});

export default rootReducer;