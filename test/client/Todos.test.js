import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Todos from '../../src/components/Todos';

const todos = [{
	id: 1,
	name: "one",
	completed: false
}];

let testNode;

before(function(done) {
	const onDelete = function() {};
	const onComplete = function() {};
	const testComponent = TestUtils.renderIntoDocument(
		<Todos todos={todos} onDelete={onDelete} onComplete={onComplete}/>
	);
	testNode = ReactDOM.findDOMNode(testComponent);
	done();
});

describe('JSDom', () => {
	it('loads window, document, and jQuery', () => {
		expect(window).to.be.an('object');
		expect(document).to.be.an('object');
		expect($).to.be.a('function');
	});
});

describe('Todos component', () => {
	it('renders correctly', () => {
		expect(testNode.nodeName).to.be.equal('UL');
		expect(testNode.getElementsByTagName('LI').length).to.be.equal(1);
		expect(testNode.getElementsByTagName('LI')[0]).to.be.an('object');
		expect(testNode.getElementsByTagName('SPAN')[0].textContent).to.be.equal(todos[0].name);
	});
});
