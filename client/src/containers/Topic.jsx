import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import vote from '../actions/vote';
import setFilter from '../actions/setFilter';
import { getAnswersForQuestion } from '../actions/answerActions';
import { getQuestions } from '../actions/questionAction';
import Chip from 'material-ui/Chip';
import AnswerVideoGrid from './../components/AnswerVideoGrid.jsx';
import { orderBy } from 'lodash';

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
  }

  componentWillMount() {
    // if user is not already on the site, questions and answers haven't been loaded by App, so need to check and if question is undefined, need to fetch all questions, and set state, then fetch all answers with the question id.
    if (this.state.question === undefined) {
      this.props.getQuestions().then(() => {
        this.setState({
          question: this.props.question
        })
        this.props.getAnswersForQuestion(this.state.question.id, this.state.code).then(() => {
          this.setState({
            answers: this.props.answers
          })
        }); 
      })
    } else {
      // on load, we go and fetch all answers, but need to set state to tell the components to re-render, can't just use props
      this.props.getAnswersForQuestion(this.state.question.id, this.state.code).then(() => {
        this.setState({
          answers: this.props.answers
        })
      }); 
    }
  }


  copyToClipboard() {
    //Copy share link to clipboard
    $('#shareLink').select();
    document.execCommand("copy");
  };

  renderTag(data) {
    return (
      <Chip
        key={data}
        style={this.styles.chip}
      >
        {data}
      </Chip>
    );
  }

  // on first load from not on the site, question is undefined but topic still tries to render, so if it is undefined, load an empty div (could instead be a loading gif), which will then be changed when we set state with data
  render() {
    if (this.state.question === undefined) {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="col s8 offset-s2">
            <h2 className="center-align blue-text">Question</h2>
          </div>

          <div className="col s8 offset-s2">
              <video controls src={this.state.question.url} width="100%"/>
          </div>
          <br/>
          <div className="row" style={this.styles.wrapper}>
            {this.state.question.tags.map(this.renderTag, this)}
          </div>
          <div className="row">
            <div className="col s8">
                <input id='shareLink' defaultValue={window.location.href} />
                <Link to={`/qa/${this.state.code}/answer`} id="record-answer" className="btn waves-effect waves-light blue darken-1" style={{'marginRight': '5px'}}>Record Your Answer!</Link>
                <a className="waves-effect waves-light btn blue darken-1" style={{'marginLeft': '5px'}} onClick={this.copyToClipboard}>Copy link to share!</a>  
            </div>
            <div className="col s2" style={{color: '#1E88E5', cursor: 'pointer', 'textAlign': 'center'}}>
              <i className="medium material-icons" onClick={this.props.upvote.bind(null, 'questions', this.state.question)}>thumb_up</i>
              <p>{this.props.question.upvote || 0} Upvotes</p>
            </div>
            <div className="col s2" style={{color: '#1E88E5', cursor: 'pointer', 'textAlign': 'center'}}>
              <i className="medium material-icons" onClick={this.props.downvote.bind(null, 'questions', this.state.question)}>thumb_down</i>
              <p>{this.props.question.downvote || 0} Downvotes</p>
            </div>
          </div>
          <div className="col s8 offset-s2">
            <h2 className="center-align blue-text">Answers</h2>
          </div>
          
          <AnswerVideoGrid videos={this.state.answers} upvote={this.props.upvote.bind(null, 'answers')} downvote={this.props.downvote.bind(null, 'answers')} setFilter={this.state.setFilter} />
        </div>
    );
    }
  }
}

function orderAnswers(answers, order) {
  switch(order) {
    case 'NEWEST':
      return orderBy(answers, ['createdAt'], ['desc']);
    case 'OLDEST':
      return orderBy(answers, ['createdAt'], ['asc']);
    case 'HIGHEST_RATED':
      return orderBy(answers, answer => answer.upvote - answer.downvote, ['desc']);
    case 'POPULAR':
      return orderBy(answers, answer => (answer.upvote - answer.downvote) * (answer.upvote + answer.downvote), ['desc']);
    default:
      return answers;
  }
}

function mapStateToProps(state, ownProps) {
  var code = ownProps.params.code;
  return {
    code: code,
    question: state.questionsByCode[code],
    answers: orderAnswers(state.answersOfQuestions[code], state.filter) || [],
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    upvote: bindActionCreators(vote.bind(null, 'upvote'), dispatch),
    downvote: bindActionCreators(vote.bind(null, 'downvote'), dispatch),
    setFilter: bindActionCreators(setFilter, dispatch),
    getQuestions: bindActionCreators(getQuestions, dispatch),
    getAnswersForQuestion: bindActionCreators(getAnswersForQuestion, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Topic);


