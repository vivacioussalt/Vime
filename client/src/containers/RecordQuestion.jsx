import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import { postQuestion } from './../actions/questionAction.jsx';

class RecordQuestion extends React.Component {
  constructor(props){
    super(props);
    this.addToState = this.addToState.bind(this);
  }

  addToState(data) {
    var question = {
      ...data,
      userId: this.props.userId
    }
    // call action creator which will redirect to topic page
    this.props.postQuestion(question);
  }

  render(){
    return (
      <div><Record addToState={this.addToState} apiUrl={'/api/questions'} userId={this.props.userId}/></div>
    );
  }
}


function mapStateToProps(state) {
  return {
    userId: state.user ? state.user.id : null 
  };
}
function mapDispatchToProps(dispatch) {
  return {
    postQuestion: bindActionCreators(postQuestion, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RecordQuestion);
