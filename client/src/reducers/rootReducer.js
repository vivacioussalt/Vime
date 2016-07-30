import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import questionsByCode from './questionsByCode';
import answersOfQuestions from './answersOfQuestions';
import filter from './filter';

const rootReducer = combineReducers({
  questionsByCode,
  user,
  answersOfQuestions,
  filter,
  routing: routerReducer
});

export default rootReducer;
