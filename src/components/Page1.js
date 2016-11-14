import React, {Component} from 'react';

export default class Page1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page : 1
		};
	}
	render() {
		return (<div>
			page { this.state.page }
		</div>);
	}
}
