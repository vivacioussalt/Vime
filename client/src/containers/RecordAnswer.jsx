import React from 'react';
import Record from './../components/Record.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import answerActions from './../actions/answerActions.jsx';


class RecordAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.params.code
    }
  }

  render() {
    return (
      <div>
        <Record addToState={this.props.actions.addAnswer} apiUrl={'/api/answers'} questionCode={this.state.code} />
      </div>
    );
  }
}


function mapDispatchToProps(dispatch){
  return {
    actions: bindActionCreators(answerActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(RecordAnswer);