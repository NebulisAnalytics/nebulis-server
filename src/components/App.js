import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './Layout';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import NotFound from './NotFound';

alert('hi')

export default class App extends Component {

	constructor(props) {
		super(props);
	}
	render() {
		return (<Router history={browserHistory}>
			<Route path="/" component={Layout}>
				<IndexRoute component={Home}/>
				<Route path="/page1" component={Page1}/>
				<Route path="/page2" component={Page2}/>
				<Route path="*" component={NotFound}/>
			</Route>
		</Router>);
	}
}
