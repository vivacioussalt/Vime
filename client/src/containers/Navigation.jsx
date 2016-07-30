import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logout from '../actions/logout';

/////////////////////////////////////////////////////////////
import io from 'socket.io-client';
//TEMPORARY: putting socket initialization here
const socket = io();
/////////////////////////////////////////////////////////////

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    this.props.logout();
    this.context.router.push('/');
  }
  componentDidMount(){
    console.log('You said hello to the server');
    socket.emit('some message','hello');
    socket.on('someone else', function(msg){
      console.log('You got a message from someone else:', msg);
    });
    socket.on('makeQuestion', function(msg){
      alert(msg);
    });
  }
  componentWillUnmount(){
    socket.close();
  }
  render() {
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <img className="logo" src="/assets/images/grandiose-potatoe.gif" height="100%"/>
          <Link id="logo-container" to="/" className="brand-logo"> Vime </Link>
          <a href="#" data-activates="mobile-demo" className="right button-collapse"><i className="material-icons">menu</i></a>
          {this.props.location === '/login' ? '' : this.props.user ? 
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><button onClick={this.handleLogout} className="btn-large waves-effect waves-light blue darken-1">Log Out</button></li>
              <li><Link to="/profile" className="btn-large waves-effect waves-light blue darken-1"><i className="material-icons">perm_identity</i></Link></li> 
            </ul>
            :
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/login" className="btn-large waves-effect waves-light blue darken-1">Login/Signup</Link></li>
            </ul>
          }          

          {/*SIDE NAV*/}
          <ul className="side-nav" id="mobile-demo">
          {this.props.location === '/login' ? '' : this.props.user ? 
            <li><Link to="/profile" className="btn-large waves-effect waves-light blue darken-1"><i className="material-icons">perm_identity</i></Link></li> 
            :
            <li><Link to="/login" className="btn-large waves-effect waves-light blue darken-1">Login/Signup</Link></li>
          }  
          {this.props.location === '/login' ? 
          '' : this.props.user ? 
            <li><a href='javascript:;' onClick={this.handleLogout} className="btn-large waves-effect waves-light blue darken-1">Log Out</a></li>
            :
            ''
          }            
          </ul>
        </div>
      </nav>
    );
  }
}

Navigation.contextTypes = {
  router:React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    //loc: ownProps,
    location: state.routing.locationBeforeTransitions.pathname
  }
}
function mapDispatchToProps(dispatch){
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
