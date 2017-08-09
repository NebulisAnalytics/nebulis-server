import React, { Component } from 'react';
import { Link } from 'react-router';
import { Members } from './Members';
import { ListItem } from 'material-ui/List';
// import AccountPlus from 'mdi-material-ui/AccountPlus';


export default class MemberListItems extends Component {
  render() {
    const member = this.props.member;
    return (
      <ListItem
  				primaryText= { "Name: " + member.username }
  				secondaryText= { "Admin? " + member.admin }
  				hoverColor= { '#FF8442' }>
  		</ListItem>
  )}
}



//
// <Link to={"/projects/" + project.id}>
//
// <a href="javascript://" onClick={ ::this.props.makeAdmin }>
// <AccountPlusIcon/>
// </a>
// <a href="javascript://" onClick={ ::this.props.onDelete }>
//   ×
// </a>
