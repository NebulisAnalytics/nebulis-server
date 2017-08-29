import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';
import Teams from '../../components/Teams';
import * as actions from '../../actions/nebulisActions.js';
import { getStore } from './../../store/configureStore';
import ghoulie from 'ghoulie';

export default class TeamsContainer extends Component {

  render() {
    const subtitle = this.props.project ? this.props.project.name: '';
    return (
        <Layout title={`Project: ${subtitle}`}>
        <div id="page-teams" className="page">
          {this.renderTeams()}

        </div>
      </Layout>
    );
  }

	renderTeams() {
		if (this.props.teams) {
			return (
        <Teams
  				teams={this.props.teams}
  				onTeamTouch={::this.onTeamTouch}
  				onDownload={this.props.onDownload}
          />
      );
		}
	}

  onTeamTouch(id) {
    console.log('opened team', id);
  }

}
