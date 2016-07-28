import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/App.jsx';
import Login from './containers/Login.jsx';
import RecordQuestion from './containers/RecordQuestion.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
import Error from './components/Error.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <Route path="record" component={RecordQuestion} />
    <Route path="videos/:id" component={VideoPlayer} />
    <Route path="*" component={Error} />
  </Route>
);
