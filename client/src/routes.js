import React from 'react';
import {Router, Route} from 'react-router';
import App from './components/app.jsx';
import Record from './components/Record.jsx';
import VideoPlayer from './components/VideoPlayer.jsx';
// import Login from './components/Login.jsx';
// import Question from './components/Question.jsx';
// import Answer from './components/Answer.jsx';
// import QandA from './components/QandA.jsx';

export default (
  <Route path="/" component={App}>
    <Route path="record" component={Record}/>
    <Route path="videos/:id" component={VideoPlayer}/>
  </Route>
);
/*
    <Route path="login" component={Login} />
    <Route path="question" component={Question} />
    <Route path="answer" component={Answer} />
    <Route path="qa/:qaId" component={QandA} />
*/
// Home /
// Login/Signup /login
// Question /record/question
// Answer /record/answer
// Q&A /qa/*
