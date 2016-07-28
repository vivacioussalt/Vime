import React from 'react'
import { Link } from 'react-router';

const Navigation = () => (
  <nav className="light-blue lighten-1" role="navigation">
    <div className="nav-wrapper container">
      <img className="logo" src="/assets/images/grandiose-potatoe.gif" height="100%"/>
      <a id="logo-container" href="/" className="brand-logo"> Vime </a>
      <a href="#" data-activates="mobile-demo" className="right button-collapse"><i className="material-icons">menu</i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/login" className="btn-large waves-effect waves-light blue darken-1">Login/Signup</Link></li>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <li><Link to="/login" className="btn-large waves-effect waves-light blue darken-1">Login/Signup</Link></li>
      </ul>
    </div>
  </nav>
);

export default Navigation;