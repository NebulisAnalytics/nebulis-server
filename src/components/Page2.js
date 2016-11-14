import React, {Component} from 'react';

export default class Page2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page : 2
		};
	}
	render() {
		return (<div>
			page { this.state.page }
		</div>);
	}
}
