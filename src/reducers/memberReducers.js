import {createReducer} from '../utils/redux-helpers.js';
import getInitialState from './initialState'

// export default function getInitialState() {
// 	return {
// 		error: null,
// 		loading: false,
// 		members: []
// 	}
// }

// MEMBERS REDUCER


const reducer = createReducer(getInitialState, {
	GET_MEMBERS: function(state, action) {
		return Object.assign({}, state, {
			loading: true
		});
	},
	GET_MEMBERS_SUCCESS: function(state, action) {
		return Object.assign({}, state, {
			loading: false,
			members: action.results  	// response JSON body is available in action.results
		});
	},
	CREATE_MEMBER: function(state, action) {
		return Object.assign({}, state, {
			loading: true,
		});
	},
	CREATE_MEMBER_SUCCESS: function(state, action) {
		return Object.assign({}, state, {
			loading: false,
		});
	},
	DELETE_MEMBER: function(state, action) {
		return Object.assign({}, state, {
			// loading: false, TODO: Add functionality

		});
	},
});

export {reducer};
