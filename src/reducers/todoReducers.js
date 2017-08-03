import {createReducer} from '../utils/redux-helpers.js';
import getInitialState from './initialState'

// export default function getInitialState() {
// 	return {
// 		error: null,
// 		loading: false,
// 		todos: []
// 	}
// }

// TODOS REDUCER


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
