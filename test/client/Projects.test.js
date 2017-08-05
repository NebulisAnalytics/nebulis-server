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
},
{
  id: 2,
  name: "two",
  updatedAt: 'Feb 14, 1995'
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
  it('should render window, document, and jQuery', () => {
    expect(window).to.be.an('object');
    expect(document).to.be.an('object');
    expect($).to.be.a('function');
  });
});

describe('Projects component', () => {
  it(`should render 'project' div correctly`, () => {
    let testNode = ReactDOM.findDOMNode(testComponent);

    expect(testNode.nodeName).to.be.equal('DIV');
    expect(testNode.className).to.be.equal('projects');
    expect(testNode.getElementsByTagName('LI')[0]).to.be.an('object');
    expect(testNode.getElementsByTagName('SPAN')[0].textContent).to.be.equal(`Title: ${projects[0].name} Updated At: ${projects[0].updatedAt}`);
  });
  it('should render list of all projects in db', () => {
    let testNode = ReactDOM.findDOMNode(testComponent);
    expect(testNode.getElementsByTagName('LI').length).to.be.equal(2);
  });
});
