import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import vote from '../actions/vote';
import AnswerVideoGrid from './../components/AnswerVideoGrid.jsx';

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    console.log('topic', props);
  }

  render() {
    return (
      <div>
        <div className="col s8 offset-s2">
          <h4 className="center-align">Question</h4>
        </div>

        <div className="col s8 offset-s2">
            <video controls src={this.props.question.url} width="100%"/>
        </div>

        <div className="row">
          <div className="col s8">
            <Link to={`/qa/${this.props.code}/answer`} id="record-answer" className="btn-large waves-effect waves-light blue darken-1">Record Your Answer!</Link>
          </div>
          <div className="col s2">
            <i className="medium material-icons" onClick={this.props.upvote.bind(null, 'questions', this.props.question)}>thumb_up</i>
            <p>{this.props.question.upvote || 0}</p>
          </div>
          <div className="col s2">
            <i className="medium material-icons" onClick={this.props.downvote.bind(null, 'questions', this.props.question)}>thumb_down</i>
            <p>{this.props.question.downvote || 0}</p>
          </div>
        </div>
        <div className="col s8 offset-s2">
          <h4 className="center-align">Answers</h4>
        </div>
        
        <AnswerVideoGrid videos={this.props.answers} upvote={this.props.upvote.bind(null, 'answers')} downvote={this.props.downvote.bind(null, 'answers')} />

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  var code = ownProps.params.code;
  return {
    code: code,
    question: state.questionsByCode[code],
    answers: state.answersOfQuestions[code] || [],
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
   upvote: bindActionCreators(vote.bind(null, 'upvote'), dispatch),
    downvote: bindActionCreators(vote.bind(null, 'downvote'), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);


