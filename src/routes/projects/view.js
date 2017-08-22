import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TeamsContainer from '../../routes/projects/team';
import * as actions from '../../actions/nebulisActions.js';
import { getStore } from './../../store/configureStore';

import ghoulie from 'ghoulie';

export default class ProjectsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			// map the model to state
			loading: getStore().getState().projectsModel.loading,
			downloading: getStore().getState().teamsModel.downloading,
			project: getStore().getState().projectsModel.project,
    }

    getStore().subscribe(() => {
			this.setState({
				loading: getStore().getState().projectsModel.loading,
				downloading: getStore().getState().teamsModel.downloading,
  			project: getStore().getState().projectsModel.project,
				teams: getStore().getState().teamsModel.project,
      }, () => {

  		});
  	});

    ghoulie.emit('PROJECT_PAGE_LOADED');

		// when ghoulie receives a RELOAD_PROJECTS event (from within a
    // unit test) log the event and call getProject()
		ghoulie.on('RELOAD_PROJECT', () => {
			ghoulie.log('RELOADING PROJECT !!!!');
			this.getTeams(this.props.params.id);
		});
  }

  componentDidMount() {
    this.getProject(this.props.params.id);
    this.getTeams(this.props.params.id);
	}
  // shouldComponentUpdate(nextProps, nextState) {
	// 	if ((this.state.openAddTeams && nextState.openAddTeams)) {
	// 		return false;
	// 	} else return true;
	// }

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

  render() {
		return (
      <div>
        {this.renderLoading()}
        {this.renderTeamContainer()}
      </div>
		);
	}

  renderLoading() {
    if (this.state.loading) {
      return (<div>Loading...</div>);
    }
  }

  renderTeamContainer() {
    if (this.state.project && this.state.teams) {
      return (
        <TeamsContainer
          teams={this.state.teams}
          project={this.state.project}
          onDownload={::this.onDownload}
          />
      );
    }

  }

}
