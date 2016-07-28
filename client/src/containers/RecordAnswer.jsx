import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import answerActions from './../actions/answerActions.jsx';


class RecordAnswer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <Record addToState={this.props.actions.addAnswer} apiUrl={'/api/answers'}/>
    </div>
  }
}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(answerActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RecordAnswer);