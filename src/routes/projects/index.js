import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';
import Projects from '../../components/Projects';
import ProjectListItems from '../../components/ProjectListItems';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import Form from '../../components/Form';

import { PlusIcon } from 'mdi-material-ui';

import * as actions from '../../actions/nebulisActions.js'
import { getStore, addProject, closeProject } from './../../store/configureStore';

import ghoulie from 'ghoulie';

export default class ProjectsPage extends Component {
	constructor(props) {
		super(props);
		this.handleClose = this.handleClose.bind(this);
		this.onSave = this.onSave.bind(this);

		this.state = {
			open: false,
			validation: '',
			// map the model to state
			projectsModel: getStore().getState().projectsModel
		};
		// when the store changes re-map the model to state
		getStore().subscribe(() => {
			this.setState({
				projectsModel: getStore().getState().projectsModel
			}, () => {

			});
		});

		// notify ghoulie when this component is instantiated
		ghoulie.emit('PROJECTS_PAGE_LOADED');

		// when ghoulie receives a RELOAD_PROJECTS event (from within a
    // unit test) log the event and call getProjects()
		ghoulie.on('RELOAD_PROJECTS', () => {
			ghoulie.log('RELOADING PROJECTS !!!!');
			this.getProjects();
		});
	}

	componentDidMount() {
		this.getProjects();
	}

	getProjects() {
		ghoulie.log('getting projects...');
		actions.getProjects().then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got projects', store);

			// map the model to state
			this.setState({
				projectsModel: store.projectsModel
			}, () => {

				// emit TODOS_LOADED event for ghoulie test to use
				const projects = store.projectsModel.projects;
				ghoulie.emit('PROJECTS_LOADED', projects);

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
			<Layout title="Projects">
				<div id="page-projects" className="page">

					{/* this.renderLoading() */}
					{/* Projects:<br/> */}
					<Projects projects={this.state.projectsModel.projects}/>

					<div>
						{/*will add styling */}
						<div id="projectList">

						</div>

						<FloatingActionButton style={styles.action} secondary={true} onTouchTap={::this.onAdd} mini={true}>
							<PlusIcon />
						</FloatingActionButton>
						<Dialog
							title="Add a Project"
							onRequestClose={this.handleClose}
							open={this.state.open}
							actions={[<Form
								action='http://localhost:1337/api/projects'
								method="POST"
								fields={[
									{ name: 'name', label: 'Project Name' },
									{ name: 'gitLink', label: 'Github Project Link', hint: 'https://github.com/user/project' }]}
								cancel={true}
								handleClose={this.handleClose}
								handleSubmit={this.onSave}
								form={this.form}
								validation={this.state.validation}
								/>]}
							/>
					</div>
				</div>
			</Layout>);
	}

	renderLoading() {
		if (this.state.projectsModel.loading) {
			return (<div>Loading...</div>);
		}
	}

	onSave(form) {
		ghoulie.emit('CREATE_PROJECT');
		let {name, gitLink} = form;
		actions.createProject({name: name.value, gitLink: gitLink.value}).then(store => {

			// store returned is same as getStore().getState()
			ghoulie.log('got response', store);

			// map the model to state
			this.setState({
				projectsModel: store.projectsModel,
				validation: store.projectsModel.results.summary
			}, () => {
				console.log('this.state.validation',this.state.validation);
				if(this.state.validation === undefined) {
					this.getProjects();
					this.handleClose();
				}
			});

		}).catch(function(e, store) {
			console.log('CAUGHT ERROR', e);
			debugger;
		});
	}

	onAdd(e) {
    //  replaces current list with a form to insert Github URL and project title
    //  Toggle state between current project list display OR new project form
    //  Add one at a time for now
		this.setState({open: true});
	}

	handleClose(e) {
		this.setState({open: false});
	}
  //  retrive project info from github

  //  add project info to DB

  //  move project name from unadded list to added list


	onDelete(id) {
    //  destroys selected project(s) in DB by id
		nebulisActions.deleteProject(null, {
			id
      // then pulls updated list and replaces old list
		}).then(::this.getProjects);
	}
}
