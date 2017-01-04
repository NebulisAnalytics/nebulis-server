import React, {Component} from 'react';
import Layout from './Layout';

export default class Page1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		};
	}

	render() {
		return (
			<Layout title="Page 1">
				<div>
					page { this.state.page }
				</div>
			</Layout>);
	}
}

