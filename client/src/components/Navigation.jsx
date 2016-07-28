import React from 'react'
import { Link } from 'react-router';

const Navigation = () => (
  <nav className="light-blue lighten-1" role="navigation">
    <div className="nav-wrapper container">
      <div>
        <img className="logo" src="/assets/images/grandiose-potatoe.gif" height="100%"/>
        <a id="logo-container" href="/" className="brand-logo"> Vime </a>
      </div>
    </div>
  </nav>
);

export default Navigation;