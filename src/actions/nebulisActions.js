import {createActions} from '../utils/redux-helpers.js';
import * as types from '../constants/actionTypes';
import {getStore} from './../store/configureStore.js';


// NEBULIS ACTIONS

const fetchOptions = {
	credentials: 'include',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	cache: 'default',
	mode: 'same-origin'  // if using CORS use mode: 'cors'
};

// PROJECTS ACTIONS

const actions = createActions(getStore, fetchOptions, {
	createProject: {
		method: 'post',
		url: '/api/projects',
		request: types.CREATE_PROJECT,
		success: types.CREATE_PROJECT_SUCCESS,
		error: types.PROJECTS_ERROR
	},
	getProjects: {
		method: 'get',
		url: '/api/projects',
		request: types.GET_PROJECTS,
		success: types.GET_PROJECTS_SUCCESS,
		error: types.PROJECTS_ERROR
	},
	updateProject: {
		method: 'put',
		url: '/api/projects/:id',
		request: types.UPDATE_PROJECTS,
		success: types.UPDATE_PROJECTS_SUCCESS,
		error: types.PROJECTS_ERROR
	},
	getProject: {
		method: 'get',
		url: '/api/projects/:id',
		request: types.GET_PROJECT,
		success: types.GET_PROJECT_SUCCESS,
		error: types.PROJECTS_ERROR
	},
	deleteProject: {
		method: 'delete',
		url: '/api/projects/:id',
		request: types.DELETE_PROJECT,
		success: types.DELETE_PROJECT_SUCCESS,
		error: types.PROJECTS_ERROR
	},
	deleteAll: {
		method: 'delete',
		url: '/api/projects',
		request: types.DELETE_PROJECTS,
		success: types.DELETE_PROJECTS_SUCCESS,
		error: types.PROJECTS_ERROR
	}
	//	get members
	//	get teams
});

export {actions};
export function addProject(){
	return {type: types.ADD_PROJECT}
}
export function closeProject(){
	return {type: types.CLOSE_PROJECT}
}
