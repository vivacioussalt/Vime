import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { postAnswer } from './../actions/answerActions.jsx';
import { postVideoUrl } from '../recordUtil.js';


class RecordAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.params.code,
      questionId: this.props.questionsByCode[this.props.params.code].id
    }
    this.addToState = this.addToState.bind(this);
  }

  addToState(videoData) {
    var apiUrl = '/api/answers';
    postVideoUrl(videoData.publicUrl, apiUrl, this.props.userId, this.state.questionId)
    .then((data) => {
      var action = {
        questionCode: this.state.code,
        answer: {
          ...data,
          userId: this.props.userId,
          questionId: this.state.questionId       
        }
      }
      this.props.postAnswer(action);
    })

    // call action creator which will redirect to topic page
  }

  render() {
    return (
      <div>
        <Record addToState={this.addToState} addTags={() => {} } />
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
    postAnswer: bindActionCreators(postAnswer, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordAnswer);
