import expect from 'expect';
import React from 'react';
import {mount} from 'enzyme';
import TransactionList from './TransactionList';
import TableHeaderColumn from 'material-ui/Table';

describe("<TransactionList />", ()=> {
  it('renders four <TableHeaderColumn /> components', () => {
    const wrapper = mount(<TransactionList transactions={[]}/>);
    expect(wrapper.find(TableHeaderColumn)).to.have.length(4);
  });
});
