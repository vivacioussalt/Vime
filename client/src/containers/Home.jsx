import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionVideoGrid from '../components/QuestionVideoGrid';
import { getQuestions } from '../actions/questionAction';
import { getAnswersForQuestion } from '../actions/answerActions';
import setFilter from '../actions/setFilter';
import { values, orderBy } from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount(){
    this.props.getQuestions();
  }

  render() {
    return (
      <div className="row">
        
        <br></br>
        
        <h2 className="header center blue-text blue-darken-1">A seamless video chat experience</h2>
        <div className="row center">
          <h4 className="header col s12 light">Never miss another message again</h4>
          <div className="row">
            <Link to="/record/question" id="download-button" className="btn-large waves-effect waves-light blue darken-1">Ask a question</Link>
          </div>
        </div>
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="medium material-icons">av_timer</i></h2>
                <h5 className="center">On your time</h5>
                <p className="light">With Vime, you can create a video message on your own schedule. Record a video to send to someone
                  and let them watch it whenever they want. Can't talk face to face in the morning because someone is going to sleep in a different time zone? No problem, record a video and they can watch the video whenever they wake up. Never let time be a factor again.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="medium material-icons">group</i></h2>
                <h5 className="center">Simplicity</h5>
                <p className="light">With Vime's minimalistic interface, recording and sharing a video can be done in just a couple clicks. There's no reason to miss out on great conversations with loved ones because something is too difficult to use. We're all about being connected.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="medium material-icons">textsms</i></h2>
                <h5 className="center">Lost for words?</h5>
                <p className="light">Sometimes we don't have much to say outside of what we ate for lunch, but there's some great stories that happen throughout the day we forget about that other people would love to hear. Vime can throw some questions your way to get the juices flowing so every video is unique and interesting.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h3>Questions</h3>
          <p className="col s1">Filter</p>
          <p className="col s1 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={this.props.setFilter.bind(null, 'NEWEST')}>Newest</p>
          <p className="col s1 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={this.props.setFilter.bind(null, 'OLDEST')}>Oldest</p>
          <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={this.props.setFilter.bind(null, 'HIGHEST_RATED')}>Highest Rated</p>
          <p className="col s2 offset-s1 center-align btn-medium waves-effect waves-light blue darken-1" onClick={this.props.setFilter.bind(null, 'POPULAR')}>Popular</p>
          <div className="col s12">
            <QuestionVideoGrid videos={this.props.questions || []} fetchAnswers={this.props.getAnswersForQuestion} />
          </div>
        </div>
      </div>
    );
  }
};

function orderQuestions(questions, order) {
  switch(order) {
    case 'NEWEST':
      return orderBy(questions, ['createdAt'], ['desc']);
    case 'OLDEST':
      return orderBy(questions, ['createdAt'], ['asc']);
    case 'HIGHEST_RATED':
      return orderBy(questions, question => (question.upvote - question.downvote) * (question.upvote + question.downvote), ['desc']); 
    case 'POPULAR':
      return orderBy(questions, question => question.upvote + question.downvote, ['desc']);
    default:
      return questions;
  }
}

function mapStateToProps(state) {
  return {
    questionsByCode: state.questionsByCode,
    questions: orderQuestions(values(state.questionsByCode), state.filter)
  }
}
function mapDispatchToProps(dispatch){
  return {
    getQuestions: bindActionCreators(getQuestions, dispatch),
    getAnswersForQuestion: bindActionCreators(getAnswersForQuestion, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);



