import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logout from '../actions/logout';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(){
    this.props.logout();
    this.context.router.push('/');
  }
  render() {
    return (
      <nav className="light-blue lighten-1" role="navigation">
        <div className="nav-wrapper container">
          <img className="logo hide-on-med-and-down" src="/assets/images/grandiose-potatoe.gif" height="100%"/>
          <a id="logo-container" href="/" className="brand-logo"> Vime </a>
          {this.props.location === '/login' ? 
          '' 
          :
          this.props.user ? 
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><button onClick={this.handleLogout} className="btn-flat btn-large waves-effect waves-light blue darken-1">Log Out</button></li>
              <li><Link to="/profile" className="btn-flat btn-large waves-effect waves-light blue darken-1"><i className="material-icons">perm_identity</i></Link></li> 
            </ul>
            :
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="/login" className="btn-flat btn-large waves-effect waves-light blue darken-1">Login/Signup</Link></li>
            </ul>
          }  

          {this.props.location === '/login' ? 
          '' 
          :
          this.props.user ? 
            <div id="nav-mobile">
              <button onClick={this.handleLogout} className="btn-flat btn waves-effect waves-light blue darken-1 hide-on-large-only" style={{'float':'left', 'height':'100%', 'width':'30%'}}>Logout</button>
              <Link to="/profile" className="btn-flat btn-large waves-effect waves-light blue darken-1 hide-on-large-only" style={{'float':'right', 'height':'100%','width':'30%'}}><i className="material-icons">perm_identity</i></Link>
            </div>               
            :
            <ul id="nav-mobile" className="right show-on-medium-and-down hide-on-med-and-up">
              <li><Link to="/login" className="btn-flat btn-small waves-effect waves-light blue darken-1">Login/Signup</Link></li>
            </ul>
          }  
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