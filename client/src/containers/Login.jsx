import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import login from '../actions/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameInvalid: true,
      passwordInvalid: true
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
      usernameInvalid: e.target.value.match(/^[a-zA-Z0-9_]*$/) ? false : true
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      passwordInvalid: e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/) ? false : true
    });
  }

  // need to set current user in app, just getting user id back here right now
  handleLogin(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
    this.setState({
      username: '',
      password: '',
      usernameInvalid: true,
      passwordInvalid: true    
    });
  }

  render() {
    return ( 
      <div className="row">
        <h3>Login/Signup</h3>
        <div className="row">
          <form className="col s12" onSubmit={this.handleLogin}>
            <div className="row">
              <div className="input-field col s6">
                <input className="validate" id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                <label htmlFor="username">Username</label>
                <p style={{fontSize:"10px"}}>Can contain letters, numbers, and underscore</p>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input className="validate" id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                <label htmlFor="password">Password</label>
                <p style={{fontSize:"10px"}}>Must be between 8 and 15 characters, contain at least one lowercase, one uppercase, and one number</p>
              </div>
            </div>
            <div className="row">
              <button className="btn-large waves-effect waves-light blue darken-1" type="submit" disabled={this.state.usernameInvalid || this.state.passwordInvalid}>Login/SignUp</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Login)


