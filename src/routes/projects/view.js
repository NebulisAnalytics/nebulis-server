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
			project: getStore().getState().teamsModel.project,
    }

    getStore().subscribe(() => {
			this.setState({
				loading: getStore().getState().projectsModel.loading,
				downloading: getStore().getState().teamsModel.downloading,
  			project: getStore().getState().teamsModel.project,
				teams: getStore().getState().teamsModel.teams,
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
    this.getTeams(this.props.params.id);
	}

  getTeams(id) {
		ghoulie.log('getting teams...');
		actions.getTeams(undefined, {id}).then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got Teams', store);

			// map the project to state
			this.setState({
        project: store.teamsModel.project,
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
        <TeamsContainer
          teams={this.state.teams}
          project={this.state.project}
          onDownload={::this.onDownload}
          />
      </div>
		);
	}

  renderLoading() {
    if (this.state.loading) {
      return (<div>Loading...</div>);
    }
  }
}
