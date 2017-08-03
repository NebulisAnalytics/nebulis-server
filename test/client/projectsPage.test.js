import chai from 'chai';
const expect = chai.expect;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { getStore } from '../../src/store/configureStore';


describe('Store', () => {
  it('store console log', () => {
    console.log(getStore().getState().projectsModel.projects)
  });
});
