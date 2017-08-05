import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Members from '../../src/components/Members';

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

  testComponent = TestUtils.renderIntoDocument(
    <Members members={ members } makeAdmin={ makeAdmin } onDelete={ deleteHandler } />
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

describe('Members component', () => {
  it(`should render 'members' div correctly`, () => {
    let testNode = ReactDOM.findDOMNode(testComponent);

    expect(testNode.nodeName).to.be.equal('DIV');
    expect(testNode.className).to.be.equal('members');
    expect(testNode.getElementsByTagName('LI')[0]).to.be.an('object');
    expect(testNode.getElementsByTagName('SPAN')[0].textContent).to.be.equal(`Name: ${members[0].username}`);
  });
  it('should render list of all members in db (regardless of admin status)', () => {
    let testNode = ReactDOM.findDOMNode(testComponent);
    expect(testNode.getElementsByTagName('LI').length).to.be.equal(2);
  });
});
