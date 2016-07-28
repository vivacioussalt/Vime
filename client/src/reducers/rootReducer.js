import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import questionsByCode from './questionsByCode';
import answersOfQuestions from './answersOfQuestions';

const rootReducer = combineReducers({
  questionsByCode,
  user,
  answersOfQuestions,
  routing: routerReducer
});

export default rootReducer;
