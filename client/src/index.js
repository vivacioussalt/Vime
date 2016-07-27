import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import {browserHistory, Router, Route} from 'react-router';
import routes from './routes.js';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
