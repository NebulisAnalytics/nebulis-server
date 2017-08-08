import React, {Component} from 'react';
import {Link} from 'react-router';
import { DeleteIcon, DownloadIcon } from 'mdi-material-ui';
import {List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class Projects extends Component {
	render() {
		return (
			<div className="projects">
				{ this.renderProjects() }
			</div>);
	}

	renderProjects() {
		if (this.props.projects.length) {
			return (
				<List>
					<Subheader inset={true}>Projects</Subheader>
				{ this.props.projects.map((project, index) => {
					let completeHandler = () => {
						this.props.onToggleCompleted(project.id, !project.completed);
					};
					let deleteHandler = () => {
						this.props.onDelete(project.id);
					};
					return (<Project key={index} project={project} onDownload={completeHandler} onDelete={deleteHandler}/>);
				})}
			</List>
			);
		}
	}
}

class Project extends Component {
	render() {
		const project = this.props.project;
		return (
			<Link to={"/projects/" + project.id}>
			<ListItem
				primaryText= { "Title: " + project.name }
				secondaryText= { "Updated At: " + project.updatedAt }>

				 {/* <a href="javascript://" onClick={ ::this.props.onDownload }>
					<DownloadIcon/>
				</a>

				<a href="javascript://" onClick={ ::this.props.onDelete }>
					<DeleteIcon/>
				</a> */}
		</ListItem>
			</Link>
		);

	}
}
