'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getQuestions } from '../actions/questionAction';

import Home from './Home.jsx';
import Navigation from './Navigation.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
	}
  componentWillMount(){
    //Load up questions when user starts app
    this.props.getQuestions();
  }
	render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
	}
}

function mapStateToProps(state) {
  return {
    questionsByCode: state.questionsByCode,
  }
}
function mapDispatchToProps(dispatch){
  return {
    getQuestions: bindActionCreators(getQuestions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
