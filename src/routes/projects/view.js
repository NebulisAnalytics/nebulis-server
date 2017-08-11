import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';
import Teams from '../../components/Teams';
import AddTeam from '../../components/AddTeam';
import * as actions from '../../actions/nebulisActions.js'
import { getStore } from './../../store/configureStore';
import { PlusIcon } from 'mdi-material-ui';
import RaisedButton from 'material-ui/RaisedButton';


import ghoulie from 'ghoulie';

export default class ProjectsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {

			// map the model to state
			loading: getStore().getState().projectsModel.loading,
			downloading: getStore().getState().teamsModel.downloading,
			project: getStore().getState().projectsModel.project,
			teams: getStore().getState().teamsModel.teams,
			team: getStore().getState().teamsModel.team,
			members: getStore().getState().teamsModel.members,
			openAddTeams: false
		};

		// when the store changes re-map the model to state
		getStore().subscribe(() => {
			this.setState({
				loading: getStore().getState().projectsModel.loading,
				downloading: getStore().getState().teamsModel.downloading,
				project: getStore().getState().projectsModel.project,
				teams: getStore().getState().teamsModel.project,
				team: getStore().getState().teamsModel.team,
				members: getStore().getState().membersModel.members,
			}, () => {

			});
		});

		// notify ghoulie when this component is instantiated
		ghoulie.emit('PROJECT_PAGE_LOADED');

		// when ghoulie receives a RELOAD_PROJECTS event (from within a
    // unit test) log the event and call getProject()
		ghoulie.on('RELOAD_PROJECT', () => {
			ghoulie.log('RELOADING PROJECT !!!!');
			this.getProject(this.props.params.id);
		});
	}

	componentDidMount() {
		this.getProject(this.props.params.id);
	  this.getTeams(this.props.params.id);
		this.getMembers();
	}

	// componentWillUpdate() {
	// 	this.getProject(this.props.params.id);
	//   this.getTeams(this.props.params.id);
	// 	this.getMembers();
	// }

	shouldComponentUpdate(nextProps, nextState) {
		if ((this.state.openAddTeams && nextState.openAddTeams)) {
			return false;
		} else return true;
	}

	getProject(id) {
		ghoulie.log('getting project...');
		actions.getProject(undefined, {id}).then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got project', store);

			// map the project to state
			this.setState({
				loading: store.projectsModel.loading,
				project: store.projectsModel.project
			}, () => {

				// emit PROJECT_LOADED event for ghoulie test to use
				const project = store.projectsModel.project;
				ghoulie.emit('PROJECT_LOADED', project);

			});

		}).catch(function(e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}

	getTeams(id) {
		ghoulie.log('getting teams...');
		actions.getTeams(undefined, {id}).then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got Teams', store);

			// map the project to state
			this.setState({
				loading: store.teamsModel.loading,
				teams: store.teamsModel.teams
			}, () => {

				// emit PROJECT_LOADED event for ghoulie test to use
				const teams = store.teamsModel.teams;
				ghoulie.emit('TEAMS_LOADED', teams);

			});

		}).catch(function(e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}

	getMembers() {
		ghoulie.log('getting members...');
		actions.getMembers().then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got members', store);

			// map the model to state
			this.setState({
				members: store.membersModel.members
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

		console.log('render projects now',this.state.project);
		const subtitle = this.state.project !== null ? this.state.project.name : '';
		return (

			<Layout title={`Project ${subtitle}`}>
				{this.renderLoading()}
				<div id="page-teams" className="page">
				<RaisedButton
						target="_blank"
						label="Add Team"
						secondary={true}
						icon={<PlusIcon />}
						onTouchTap={::this.addTeam}
					/>
				{this.renderAddTeams()}
				{this.renderTeams()}
				</div>
			</Layout>
		);
	}



	renderLoading() {
		if (this.state.loading) {
			return (<div>Loading...</div>);
		}
	}

	renderTeams() {
		if (this.state.teams) {
			return (<Teams
				teams={this.state.teams}
				onTeamTouch={::this.onTeamTouch}
				onDownload={::this.onDownload} />);
		}
	}

	renderAddTeams() {
		if (this.state.openAddTeams) {
			return (
				<AddTeam
					members={this.state.members}
					open={this.state.openAddTeams}
					onClose={::this.closeAddTeam}
					onSave={::this.onSave}
					handleMemberClick={::this.handleMemberClick}/>
			);
		}
	}

	onDownload(id) {
		ghoulie.log('Dowloading...');
		actions.downloadTeamProject(undefined, {id}).then(store => {
			ghoulie.log('got Teams', store);

			this.setState({
				downloading: store.teamsModel.dowloading
			}, () => {
				ghoulie.emit('TEAM_PROJECT_DOWNLOADED');
			}).catch(function(e, store) {
				console.log('CAUGHT ERROR', e);
				debugger;
			});
		});
	}

	addTeam() {
		this.setState({openAddTeams: true});
	}

	closeAddTeam() {
		getStore().dispatch(actions.closeAddTeam());
		this.getProject(this.props.params.id)
		this.getTeams(this.props.params.id);
		this.getMembers();
		this.setState({openAddTeams: false});
	}

	onSave() {
		const teamMembers = Object.keys(this.state.team).map(id => id);

		actions.createTeam({members: teamMembers, project: this.props.params.id}).then(store => {

			ghoulie.log('got response', store);

			this.closeAddTeam();

		}).catch(function (e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}

	handleMemberClick(member) {
		if (this.state.team[member.id]) {
			getStore().dispatch(actions.removeTeamMember(member));
		} else {
			getStore().dispatch(actions.addTeamMember(member));
		}
		this.setState({team: getStore().getState().teamsModel.team});
	}

	onTeamTouch(id) {
		console.log('opened team', id);
	}

	onDelete(id) {
		console.log('delete', id);
	}

	// onDelete(id) {
  //   //  destroys selected project(s) in DB by id
	// 	nebulisActions.deleteProject(null, {
	// 		id
  //     // then pulls updated list and replaces old list
	// 	}).then(::this.getProjects);
	// }
}
