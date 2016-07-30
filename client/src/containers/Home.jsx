import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QuestionVideoGrid from '../components/QuestionVideoGrid';
import { goToTopic } from '../actions/answerActions';
import setFilter from '../actions/setFilter';
import { values, orderBy, filter, includes } from 'lodash';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();
    var $target = $(e.target).find('input');
    this.props.setFilter($target.val()); 
  }
  
  render() {
    return (
      <div className="row">
        
        <br></br>
        
        <h2 className="header center blue-text blue-darken-1">Real answers from real people</h2>
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
                <p className="light">With Fryes, you can ask the world your burning question. Record a video question and share
                  it to your friends. Get your answers quick and easy, no typing or reading required. Visual learners, this is for you!</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="medium material-icons">group</i></h2>
                <h5 className="center">Simplicity</h5>
                <p className="light">With Fryes's minimalistic interface, recording and sharing a video can be done in just a couple clicks. We analyze your question for key topics so you can tag your question.</p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="icon-block">
                <h2 className="center light-blue-text"><i className="medium material-icons">textsms</i></h2>
                <h5 className="center">Optimize</h5>
                <p className="light">See someone that needs help? Answer a question and possibly get paid for it.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <h3 className="center-align blue-text">Questions</h3>
          <QuestionVideoGrid videos={this.props.questions} goToTopic={this.props.goToTopic} setFilter={this.props.setFilter} submitHandler={this.submitHandler} />
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
    // filter by tag
    default:
      return filter(questions, question => includes(question.tags, order)); 
  }
}

function mapStateToProps(state) {
  return {
    questionsByCode: state.questionsByCode,
    questions: orderQuestions(values(state.questionsByCode), state.filter) || []
  }
}
function mapDispatchToProps(dispatch){
  return {
    goToTopic: bindActionCreators(goToTopic, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
