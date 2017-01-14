import {createActions, createReducer} from '../utils/redux-helpers.js';

import {getStore} from './index';

const fetchOptions = {
	credentials: 'include',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	cache: 'default',
	mode: 'same-origin'  // if using CORS use mode: 'cors'
};

// TODOS ACTIONS

const actions = createActions(getStore, fetchOptions, {
	createTodo: {
		method: 'post',
		url: '/api/todos',
		request: 'CREATE_TODO',
		success: 'CREATE_TODO_SUCCESS',
		error: 'TODOS_ERROR'
	},
	getTodos: {
		method: 'get',
		url: '/api/todos',
		request: 'GET_TODOS',
		success: 'GET_TODOS_SUCCESS',
		error: 'TODOS_ERROR'
	},
	updateTodo: {
		method: 'put',
		url: '/api/todos/:id',
		request: 'UPDATE_TODOS',
		success: 'UPDATE_TODOS_SUCCESS',
		error: 'TODOS_ERROR'
	},
	getTodo: {
		method: 'get',
		url: '/api/todos/:id',
		request: 'GET_TODO',
		success: 'GET_TODO_SUCCESS',
		error: 'TODOS_ERROR'
	},
	deleteTodo: {
		method: 'delete',
		url: '/api/todos/:id',
		request: 'DELETE_TODO',
		success: 'DELETE_TODO_SUCCESS',
		error: 'TODOS_ERROR'
	},
	deleteAll: {
		method: 'delete',
		url: '/api/todos',
		request: 'DELETE_TODOS',
		success: 'DELETE_TODOS_SUCCESS',
		error: 'TODOS_ERROR'
	}
});

export {actions};

// TODOS REDUCER

function getInitialState() {
	return {
		error: null,
		loading: false,
		todos: []
	}
}

const reducer = createReducer(getInitialState, {
	GET_TODOS: function(state, action) {
		return Object.assign({}, state, {
			loading: true
		});
	},
	GET_TODOS_SUCCESS: function(state, action) {
		return Object.assign({}, state, {
			loading: false,
			todos: action.results  	// response JSON body is available in action.results
		});
	},

	CREATE_TODO: function(state, action) {
		return Object.assign({}, state, {
			loading: true
		});
	},
	CREATE_TODO_SUCCESS: function(state, action) {
		return Object.assign({}, state, {
			loading: false
		});
	},

	TODOS_ERROR: function(state, action) {
		return Object.assign({}, state, {
			loading: false,
			error: action.error
		});
	},
});

export {reducer};
