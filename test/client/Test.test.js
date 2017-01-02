import chai from 'chai';
const expect = chai.expect;

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

class Test extends Component {
	render() {
		return (<div className="test">{ this.props.children }</div>);
	}
}

describe('Test component', () => {
	it('renders correctly', () => {
		const testComponent = TestUtils.renderIntoDocument(
			<Test>testtext</Test>
		);
		const testNode = ReactDOM.findDOMNode(testComponent);
		expect(testNode.textContent).to.equal('testtext');
	});
});
