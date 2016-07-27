'use strict';
import React from 'react';
import { Home } from './Home.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	//Render nested routes if the user has navigated to a nested route endpoint, otherwise render the home component
	render() {
    return (
      <div>
        {this.props.children || <Home />}
      </div>
    )
	}
}
