import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import {List, ListItem } from 'material-ui/List';

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

  testComponent = shallow(
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
    expect(testComponent.node.props.className).to.be.equal('projects');
    expect(testComponent.node.type).to.be.equal('div');
    // expect(testNode.getElementsByTagName('SPAN')[0].textContent).to.be.equal(`Title: ${projects[0].name} Updated At: ${projects[0].updatedAt}`);
  });
  it('should render list of all projects in db', () => {
        console.log('this is tcom node', testComponent)
        expect(testComponent.length).to.be.equal(1)
  });
});
