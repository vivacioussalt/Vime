import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './containers/App.jsx';
import Home from './containers/Home.jsx';
import Login from './containers/Login.jsx';
import RecordQuestion from './containers/RecordQuestion.jsx';
import RecordAnswer from './containers/RecordAnswer.jsx';
import Topic from './containers/Topic.jsx';
import User from './containers/User';
import Error from './components/Error.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="login" component={Login} />
    <Route path="record/question" component={RecordQuestion} />
    <Route path="qa/:code" component={Topic} />
    <Route path="qa/:code/answer" component={RecordAnswer} />
    <Route path="profile" component={User} />
    <Route path="*" component={Error} />
  </Route>
);
