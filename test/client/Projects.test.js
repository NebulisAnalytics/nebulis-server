import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Projects from '../../src/components/Projects';

const projects = [{
  id: 1,
  name: "one",
  updatedAt: 'Sept 2, 1990'
}];

let testComponent;

before(function(done) {
  const onDelete = function() {};
  const onClick = function() {};
  
  testComponent = TestUtils.renderIntoDocument(
    <Projects projects={projects} onDelete={onDelete} onClick={onClick}/>
  );
  
  done();
});

describe('JSDom', () => {
  it('loads window, document, and jQuery', () => {
    expect(window).to.be.an('object');
    expect(document).to.be.an('object');
    expect($).to.be.a('function');
  });
});

describe('Projects component', () => {
  it('renders correctly', () => {
    
    let testNode = ReactDOM.findDOMNode(testComponent);
    
    expect(testNode.nodeName).to.be.equal('DIV');
    expect(testNode.className).to.be.equal('projects');
    expect(testNode.getElementsByTagName('LI').length).to.be.equal(1);
    expect(testNode.getElementsByTagName('LI')[0]).to.be.an('object');
    expect(testNode.getElementsByTagName('SPAN')[0].textContent).to.be.equal(projects[0].name);
  });
});
