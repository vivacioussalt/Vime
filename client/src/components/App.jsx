'use strict';
import Home from '../containers/Home.jsx';
import Navigation from './Navigation.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	//Render nested routes if the user has navigated to a nested route endpoint, otherwise render the home component
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
