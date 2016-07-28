import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import makeLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import routes from './routes.js';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, makeLogger(), routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : undefined
    // for reduxDevTools 
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
  )
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
