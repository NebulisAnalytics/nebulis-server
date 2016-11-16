import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import NotFound from './components/NotFound';

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
