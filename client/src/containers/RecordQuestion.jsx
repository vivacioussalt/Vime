import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import { postQuestion } from './../actions/questionAction.jsx';
import Chip from 'material-ui/Chip';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { union } from 'lodash';
import { postVideoUrl } from '../recordUtil.js';
injectTapEventPlugin();

class RecordQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      removedTags: [],
      tagData: []
    }
    this.styles = {
      chip: {
        margin: 4
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
      }
    };
    this.addToState = this.addToState.bind(this);
    this.addTags = this.addTags.bind(this);
  }

  render(){
    return (
      <div>
        <h2 className='center-align blue-text'>What's your question?</h2>
        <Record addToState={this.addToState} addTags={this.addTags}/>
        <div>
        {this.state.tagData.length > 0 ? <h4>I got some tags for ya:</h4> : null}
          <div style={this.styles.wrapper}>
            {this.state.tagData.map(this.renderTag, this)}
          </div>
        </div>
      </div>
    );
  }

  // NOTE: YOU WILL SEE THIS WARNING IN CONSOLE BC OF MATERIAL-UI USING AN ENHANCED BUTTON AND CALLING REACT.PROPTYPES. WILL NEED TO FIX IN FUTURE
  // Warning: You are manually calling a React.PropTypes validation function for the `linkButton` prop on `EnhancedButton`. This is deprecated and will not work in the next major version. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details.

  renderTag(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={this.styles.chip}
      >
        {data.label}
      </Chip>
    );
  }


  addToState(videoData) {
    var tags = this.state.tagData.map(tag => tag.label); 
    var apiUrl = '/api/questions';
    postVideoUrl(videoData.publicUrl, apiUrl, this.props.userId, null, tags)
    .then((data) => {
      var question = {
        ...data,
        userId: this.props.userId
      };
      this.props.postQuestion(question);
    }) 
    // call action creator which will redirect to topic page
  }

  addTags(data) {
    var data = data.split(' ');
    // console.log('BEFORE FILTER', data);
    data = data.filter(tag => tag.length > 4);
    // filtering out words with length of 3 or less
    data = union(data);
    // union is from lodash, returns just unique values

    // console.log(nlp.tags(data));
    // use a better filter to parse out nouns, people, places
    // http://nlp-compromise.github.io/website/#demos 
    
    // console.log('AFTER', data);

    var tagData = [];
    for (var i = 0; i < data.length; i++) {
      tagData.push({
        key: i,
        label: data[i]
      }); 
    }
    this.setState({
      tagData: tagData
    });
  }

  handleRequestDelete(key) {
    var tagData = this.state.tagData;
    const tagIndexToRemove = tagData.map((tag) => tag.key).indexOf(key);
    var tagToRemove = tagData.splice(tagIndexToRemove, 1);
    this.setState({
      tagData: tagData,
      removedTags: this.state.removedTags.concat([tagToRemove])
    });
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
