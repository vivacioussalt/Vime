import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import rootReducer from './reducers/rootReducer';
import routes from './routes.js';

const store = createStore(
  combineReducers({
    rootReducer,
    routing: routerReducer
  })
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
