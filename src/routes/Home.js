import React, {Component} from 'react';
import {Link} from 'react-router';
import Counter from '../components/Counter';
import Layout from './Layout';

export default class IndexPage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Layout title="Home">
				<div id="page-index" className="page">
					<Counter/>

					<div>
						<Link to="/login">Login</Link>
					</div>
					<div>
						<Link to="/projectpage">Project Page</Link>
					</div>
					<div>
						<Link to="/page2">Page 2</Link>
					</div>
					<div>
						<a href="sailshomepage">Sails default page</a>
					</div>
				</div>
			</Layout>);
	}
}
