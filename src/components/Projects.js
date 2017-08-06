import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Projects extends Component {
	render() {
		return (
			<div className="projects">
				{ this.renderProjects() }
			</div>);
	}

	renderProjects() {
		if (this.props.projects.length) {
			return (<ul>
				{ this.props.projects.map((project, index) => {
					let completeHandler = () => {
						this.props.onToggleCompleted(project.id, !project.completed);
					};
					let deleteHandler = () => {
						this.props.onDelete(project.id);
					};
					return (<Project key={index} project={project} onDownload={completeHandler} onDelete={deleteHandler}/>);
				}) }
			</ul>);
		}
	}
}

class Project extends Component {
	render() {
		const project = this.props.project;
		return (
			<li className="project">
				<Link to="./../project:id"><span>
					Title: { project.name } Updated At: { project.updatedAt }
				</span></Link>
				&nbsp;
				<a href="javascript://" onClick={ ::this.props.onDownload }>
					◊ {/* option+shift+k  */}
				</a>
				&nbsp;
				<a href="javascript://" onClick={ ::this.props.onDelete }>
					×
				</a>
			</li>);
	}
}
