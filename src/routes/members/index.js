import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Members from '../../components/Members';
import MemberListItems from '../../components/MemberListItems'
import * as actions from '../../actions/nebulisActions.js'
import { getStore, makeAdmin, removeAdmin } from './../../store/configureStore';

import { PlusIcon } from 'mdi-material-ui';
import ghoulie from 'ghoulie';


export default class MembersContainer extends Component {
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

	componentDidMount() {
		this.getMembers();
	}

	getMembers() {
		ghoulie.log('getting members...');
		actions.getMembers().then(store => {

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
		const styles = {
			action: {
				margin: 20,
			}
		}


		return (
			<Layout title="Members">
				<div id="page-members" className="page">

					{ this.renderLoading() }

          <Members members={this.state.membersModel.members} onDelete={::this.onDelete}/>

          <FloatingActionButton style={styles.action} secondary={true} onTouchTap={::this.onAdd} mini={true}>
            <PlusIcon />
          </FloatingActionButton>

					<div>
						<div id="memberList">

						</div>
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
