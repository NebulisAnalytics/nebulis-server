import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import {List, ListItem } from 'material-ui/List';
import {Link} from 'react-router';

import Projects from '../../src/components/Projects';
import ProjectListItems from '../../src/components/ProjectListItems';

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
    <Projects projects={projects}/>
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

// describe('Project component', () => { TODO:: Fix these
//   it(`should render 'ProjectListItems' correctly`, () => {
//     testComponent = shallow(<ProjectListItems project={projects[0]}/>)
//     console.log('kenny loggin', testComponent.node)
//     // expect(testComponent.node.props.className).to.be.equal('project');
//     expect(testComponent.find(Link).find(ListItem).length).to.be.equal(1);
//     // expect(testComponent.find(Link).find(ListItem).props.
//   it('should render list of all projects in db', () => {
//     expect(testComponent.find(div).find(Link).length).to.be.equal(1);
//     });
//   });
// })
