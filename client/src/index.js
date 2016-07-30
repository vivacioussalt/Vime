import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import makeLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import routes from './routes.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, makeLogger(), routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    // for reduxDevTools 
    // https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
  )
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history} routes={routes} />
    </MuiThemeProvider>
  </Provider>
  , document.getElementById('app')
);
