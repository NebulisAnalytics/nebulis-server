import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Members extends Component {
	render() {
		return (
			<div className="members">
				{ this.renderMembers() }
			</div>);
	}

  renderMembers() {
		if (this.props.members.length) {
			return (<ul>
				{ this.props.members.map((member, index) => {
					let adminHandler = () => {
						this.props.makeAdmin(member.admin, !member.added);
					};
					let deleteHandler = () => {
						this.props.onDelete(member.id);
					};
					return (<Members key={index} member={member} makeAdmin={adminHandler} onDelete={deleteHandler}/>);
				}) }
			</ul>);
		}
	}
}
	//
  // class Member extends Component {
  // 	render() {
  // 		const member = this.props.member;
  // 		return (
	//
  // 			<li className="member">
  // 				<Link to="./../member:id"><span>
  // 					Name: { member.username }
  // 				</span></Link>
  // 				&nbsp;
  // 				<a href="javascript://" onClick={ ::this.props.makeAdmin }>
  // 					✓
  // 				</a>
  // 				&nbsp;
  // 				<a href="javascript://" onClick={ ::this.props.onDelete }>
  // 					×
  // 				</a>
  // 			</li>);
  // 	}
  // }
