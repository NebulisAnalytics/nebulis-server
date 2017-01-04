import React, {Component} from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Home from './routes/Home';
import TodosPage from './routes/TodosPage';
import Page1 from './routes/Page1';
import Page2 from './routes/Page2';
import NotFound from './routes/NotFound';

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (<Router history={browserHistory}>
			<Route path="/">
				<IndexRoute component={Home}/>
				<Route path="/todos" component={TodosPage}/>
				<Route path="/page1" component={Page1}/>
				<Route path="/page2" component={Page2}/>
				<Route path="*" component={NotFound}/>
			</Route>
		</Router>);
	}
}
