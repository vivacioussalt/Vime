import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import answerActions from './../actions/answerActions.jsx';


class RecordAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.params.code,
      questionId: this.props.questionsByCode[this.props.params.code].id
    }
    this.addToState = this.addToState.bind(this);
  }

  addToState(data) {
    var action = {
      questionCode: this.state.code,
      answer: {
        ...data,
        userId: this.props.userId,
        questionId: this.state.questionId       
      }
    }
    // call action creator
    this.props.actions.addAnswer(action);
    // redirect to new topic page
    browserHistory.push(`/qa/${data.code}`);
  }




  render() {
    return (
      <div>
        <Record addToState={this.addToState} apiUrl={'/api/answers'} userId={this.props.userId} questionId={this.state.questionId} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questionsByCode: state.questionsByCode,
    userId: state.user ? state.user.id : null 
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(answerActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordAnswer);