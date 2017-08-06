import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import Members from '../components/Members';

import { getStore, nebulisActions, addMember, closeMember } from './../store/configureStore';

import ghoulie from 'ghoulie';


export default class MembersPage extends Component {
	constructor(props) {
		super(props);

		this.state = {

			// map the model to state
			membersModel: getStore().getState().membersModel
		};

		// when the store changes re-map the model to state
		getStore().subscribe(() => {
			this.setState({
				membersModel: getStore().getState().membersModel
			}, () => {

			});
		});

		// notify ghoulie when this component is instantiated
		ghoulie.emit('MEMBERS_PAGE_LOADED');

		// when ghoulie receives a RELOAD_MEMBERS event (from within a
    // unit test) log the event and call getMembers()
		ghoulie.on('RELOAD_MEMBERS', () => {
			ghoulie.log('RELOADING MEMBERS !!!!');
			this.getMembers();
		});
	}

	// componentWillMount() {
	// 	this.getMembers();
	// }

	getMembers() {
		ghoulie.log('getting members...');
		nebulisActions.getMembers().then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got members', store);

			// map the model to state
			this.setState({
				membersModel: store.membersModel
			}, () => {

				// emit TODOS_LOADED event for ghoulie test to use
				const members = store.membersModel.members;
				ghoulie.emit('MEMBERS_LOADED', members);

			});

		}).catch(function(e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}

	render() {

    let membersComponent = '';
    if(this.state.membersModel) {
      membersComponent = <Members members={this.state.membersModel.members} onDelete={::this.onDelete} onToggleCompleted={::this.onAdd}/>;
    }
    
		return (
			<Layout title="Members">
				<div id="page-members" className="page">

					{ this.renderLoading() }

					{membersComponent}

					<div>
						{/*will add styling */}
						<div id="memberList">

						</div>
						Add a member:<br/>
						<button onClick={::this.onAdd}>add</button>
					</div>
				</div>
			</Layout>);
	}

	renderLoading() {
		if (this.state.membersModel && this.state.membersModel.loading) {
			return (<div>Loading...</div>);
		}
	}

 // @ TODO
	onAdd() {

    //  replaces current list with a form to insert Github URL and member title
    //  Toggle state between current member list display OR new member form
    //  Add one at a time for now
    getStore().dispatch(addMember());

		// const name = ReactDOM.findDOMNode(this.refs.member).value;
		// nebulisActions.createMember({
		// 	name
		// }).then(store => {
		// 	ReactDOM.findDOMNode(this.refs.member).value = '';
		// 	this.getMembers();
		// });
    console.log('adding member(s)...')
	}

  //  retrive member info from github

  //  add member info to DB

  //  move member name from unadded list to added list


	onDelete(id) {
    //  destroys selected member(s) in DB by id
		nebulisActions.deleteMember(null, {
			id
      // then pulls updated list and replaces old list
		}).then(::this.getMembers);
	}
}
