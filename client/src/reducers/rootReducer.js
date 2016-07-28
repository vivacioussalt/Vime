import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import questionsById from './questionsById';
import answersOfQuestion from './answersOfQuestion';

const rootReducer = combineReducers({
  questionsById,
  user,
  answersOfQuestion,
  routing: routerReducer
});

export default rootReducer;
