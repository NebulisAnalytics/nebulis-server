import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';

import Projects from '../../components/Projects';
import ProjectListItems from '../../components/ProjectListItems'
import * as actions from '../../actions/nebulisActions.js'
import { getStore, addProject, closeProject } from './../../store/configureStore';

import ghoulie from 'ghoulie';

export default class ProjectsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {

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

	componentWillMount() {
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
		return (
			<Layout title="Projects">
				<div id="page-projects" className="page">

					{ this.renderLoading() }

					<Projects projects={this.state.projectsModel.projects} onDelete={::this.onDelete} onToggleCompleted={::this.onAdd}/>

					{/* <div>
						Add a project:<br/>
						<button onClick={::this.onAdd}>add</button>
					</div> */}
				</div>
			</Layout>);
	}

	renderLoading() {
		if (this.state.projectsModel.loading) {
			return (<div>Loading...</div>);
		}
	}

 // @ TODO
	onAdd() {

    //  replaces current list with a form to insert Github URL and project title
    //  Toggle state between current project list display OR new project form
    //  Add one at a time for now
    getStore().dispatch(addProject());

		// const name = ReactDOM.findDOMNode(this.refs.project).value;
		// nebulisActions.createProject({
		// 	name
		// }).then(store => {
		// 	ReactDOM.findDOMNode(this.refs.project).value = '';
		// 	this.getProjects();
		// });
    console.log('adding project(s)...')
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
