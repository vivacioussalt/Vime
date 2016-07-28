import React from 'react';
import { connect } from 'react-redux';
import Profile from '../components/Profile';

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

const User = connect(mapStateToProps, null)(Profile);

export default User;
