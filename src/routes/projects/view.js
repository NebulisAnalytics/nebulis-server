import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Layout from './../Layout';
import Projects from '../../components/Projects';
import * as actions from '../../actions/nebulisActions.js'
import { getStore, addProject, closeProject } from './../../store/configureStore';

import ghoulie from 'ghoulie';

export default class ProjectsContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {

			// map the model to state
			loading: getStore().getState().projectsModel.loading,
			project: getStore().getState().projectsModel.project
		};

		// when the store changes re-map the model to state
		getStore().subscribe(() => {
			this.setState({
				loading: getStore().getState().projectsModel.loading,
				project: getStore().getState().projectsModel.project
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
		console.log('this.props', this.props);
		this.getProject(this.props.params.id)
	}

	getProject(id) {
		ghoulie.log('getting project...');
		console.log(actions.getProject(undefined, {id}));
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

	render() {
		this.renderLoading();
		console.log('render proj',this.state.project);
		const subtitle = this.state.project !== null ? this.state.project.name : '';
		return (

			<Layout title={`Project ${subtitle}`}>
				{/* <div id="page-projects" className="page">



					<Projects projects={this.state.projectsModel.projects} onDelete={::this.onDelete} onToggleCompleted={::this.onAdd}/>

					<div>
						<div id="projectList">

						</div>
						Add a project:<br/>
						<button onClick={::this.onAdd}>add</button>
					</div>
				</div> */}
			</Layout>);
	}

	renderLoading() {
		if (this.state.loading) {
			return (<div>Loading...</div>);
		}
	}

 // @ TODO
	// onAdd() {
	//
  //   //  replaces current list with a form to insert Github URL and project title
  //   //  Toggle state between current project list display OR new project form
  //   //  Add one at a time for now
  //   getStore().dispatch(addProject());
	//
	// 	// const name = ReactDOM.findDOMNode(this.refs.project).value;
	// 	// nebulisActions.createProject({
	// 	// 	name
	// 	// }).then(store => {
	// 	// 	ReactDOM.findDOMNode(this.refs.project).value = '';
	// 	// 	this.getProjects();
	// 	// });
  //   console.log('adding project(s)...')
	// }

  //  retrive project info from github

  //  add project info to DB

  //  move project name from unadded list to added list

	//
	// onDelete(id) {
  //   //  destroys selected project(s) in DB by id
	// 	nebulisActions.deleteProject(null, {
	// 		id
  //     // then pulls updated list and replaces old list
	// 	}).then(::this.getProjects);
	// }
}
