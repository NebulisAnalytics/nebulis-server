import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { shallow } from 'enzyme';
import {List, ListItem } from 'material-ui/List';
import {Link} from 'react-router';

import Members from '../../src/components/Members';
import MemberListItems from '../../src/components/MemberListItems';

//adding fake members
const members = [{
  gitAccess: 'repo1',
  admin: true,
  endpoints: null,
  username: "member1",
  teams: null
},
{
  gitAccess: 'repo1',
  admin: false,
  endpoints: null,
  username: "member2",
  teams: null
}];

let testComponent;

before(function(done) {
  const onDelete = function() {};
  const onClick = function() {};
  const makeAdmin = function() {};
  const deleteHandler = function() {};

  testComponent = shallow(
    <Members members={ members } makeAdmin={ makeAdmin } onDelete={ deleteHandler }/>
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

// describe('Member component', () => { TODO: fix these 
//   it(`should render 'MembersListItems' div correctly`, () => {
//     let testNode = shallow(<MemberListItems member={members[0]}/>);
//
//     testComponent = shallow(testNode)
//     console.log('kenny loggin', testComponent.find(Link))
//     expect(testComponent.find(Link).find(ListItem).length).to.be.equal(1);
//   });
//   it('should render list of all members in db (regardless of admin status)', () => {
//     let testNode = ReactDOM.findDOMNode(testComponent);
//     expect(testComponent.find(div).find(Link).length).to.be.equal(1);
//   });
// });
