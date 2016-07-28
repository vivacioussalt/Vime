import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import addQuestion from './../actions/questionAction.jsx';

class RecordQuestion extends React.Component {
  render(){
    return (
      <div><Record addQuestion={this.props.addQuestion} apiUrl={'/api/questions'} /></div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(addQuestion, dispatch)
}

export default connect(null, mapDispatchToProps)(RecordQuestion);