import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { getAnswersForQuestion } from '../actions/answerActions';

function mapCodeToQuestions(codes, lookup) {
  return codes.map(code => lookup[code]);
}

function mapStateToProps(state) {
  return {
    user: state.user,
    questions: mapCodeToQuestions(state.user.questions, state.questionsByCode),
    answers: state.user.answers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnswers: getAnswersForQuestion
  }
}

const User = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default User;
