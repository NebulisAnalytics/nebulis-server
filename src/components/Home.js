import React, {Component} from 'react';
import {Link} from 'react-router';
import Counter from './Counter';

export default class IndexPage extends Component {
	render() {
		return (<div id="page-index" className="page">
			<Counter/>
			<div>
				<Link to="page1">Page 1</Link>
			</div>
			<div>
				<Link to="page2">Page 2</Link>
			</div>
			<div>
				<a href="sailshomepage">Sails default page</a>
			</div>
		</div>);
	}
	constructor(props) {
		super(props);
	}
}
