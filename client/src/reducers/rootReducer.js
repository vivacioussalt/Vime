import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import questionsByCode from './questionsByCode';
import answersOfQuestion from './answersOfQuestion';

const rootReducer = combineReducers({
  questionsByCode,
  user,
  answersOfQuestion,
  routing: routerReducer
});

export default rootReducer;
