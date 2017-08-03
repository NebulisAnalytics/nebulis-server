import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Login from '../../src/routes/Login';

let testComponent;

describe('Login component', () => {
before(function(done) {
  testComponent = TestUtils.renderIntoDocument(
    <Login/>
  );
  done();
});

  it('renders correctly', () => {

    let testNode = ReactDOM.findDOMNode(testComponent);

    expect(testNode.nodeName).to.be.equal('DIV');
    expect(testNode.className).to.be.equal('loginButton');
    expect(testNode.getElementsByTagName('A').length).to.be.equal(1);
    expect(testNode.getElementsByTagName('BUTTON')[0]).to.be.an('object');
    expect(testNode.getElementsByTagName('A')[0]).to.be.an('object');
  });
});
