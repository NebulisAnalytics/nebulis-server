import React, {Component} from 'react';
export default class Counter extends Component {
	constructor(props) {
		super(props);
		if (typeof window.counter === 'undefined') {
			window.counter = 0;
		}
		this.state = {
			value : window.counter,
			mounted : true
		};

		this.interval = setInterval(() => {
			if (this.state.mounted) {
				window.counter++;
				this.setState({
					value: window.counter
				});
			}
		},1000);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
		this.setState({
			mounted : false
		});
	}
	render() {
		return (<div>Counter: { this.state.value }</div>);
	}
}
