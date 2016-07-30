import { connect } from 'react-redux';
import Profile from '../components/Profile';
import { bindActionCreators } from 'redux';
import { goToTopic } from '../actions/answerActions';
import setFilter from '../actions/setFilter';

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
    goToTopic: bindActionCreators(goToTopic, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch) 
  }
}

const User = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default User;
