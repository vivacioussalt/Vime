'use strict';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getQuestions } from '../actions/questionAction';

import Home from './Home.jsx';
import Navigation from './Navigation.jsx';

/////////////////////////////////////////////////////////////
import io from 'socket.io-client';
//TEMPORARY: putting socket initialization here
const socket = io();
/////////////////////////////////////////////////////////////

class App extends React.Component {
	constructor(props) {
		super(props);
	}
  componentWillMount(){
    //Load up questions when user starts app
    var getQuestions = this.props.getQuestions;
    getQuestions();
    socket.emit('some message','hello');
    socket.on('someone else', function(msg){
      console.log('You got a message from someone else:', msg);
    });
    socket.on('makeQuestion', function(msg){
      Materialize.toast('New question video: ' + msg, 2000);
      //Add new state for notification
      getQuestions();
      //this.props.getQuestions();
    });
  }
  componentWillUnmount(){
    socket.close();
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
