import React, {Component} from 'react';
import Team from './Team';
import {Link} from 'react-router';
import {List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class Teams extends Component {
	render() {
		return (
			<div className="teams">
				{ this.renderTeams() }
			</div>);
	}

	renderTeams() {
		if (this.props.teams.length) {
			return (
				<List>
					<Subheader>Teams</Subheader>
          { this.props.teams.map((team, index) => {
  					let onTeamTouch = () => {
  						this.props.onTeamTouch(team.id);
  					};
						let onDownload = () => {
							this.props.onDownload(team.id);
						}
  					return (
							<Team key={index}
										team={team}
										onTeamOpen={onTeamTouch}
										onDownload={onDownload} />
									);
  				})}
        </List>
      );
    }
  }
}
