import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import addQuestion from './../actions/questionAction.jsx';

class RecordQuestion extends React.Component {
  render(){
    return (
      <div><Record addQuestion={this.props.actions.addQuestion}/></div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(addQuestion, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RecordQuestion);