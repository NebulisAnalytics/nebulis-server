import {createReducer} from '../utils/redux-helpers.js';
import getInitialState from './initialState'

// export default function getInitialState() {
// 	return {
// 		error: null,
// 		loading: false,
// 		projects: []
// 	}
// }

// PROJECTS REDUCER


const reducer = createReducer(getInitialState, {
  GET_PROJECTS: function(state, action) {
    return Object.assign({}, state, {
      loading: true
    });
  },
  GET_PROJECTS_SUCCESS: function(state, action) {
    return Object.assign({}, state, {
      loading: false,
      projects: action.results  	// response JSON body is available in action.results
    });
  },

  GET_PROJECT: function(state, action) {
    return {
      ...state,
      loading: true
    };
  },

  GET_PROJECT_SUCCESS: function(state, action) {
    return {
      ...state,
      loading: false,
      project: action.results[0]
    };
  },

  CREATE_PROJECT: function(state, action) {
    return Object.assign({}, state, {
      loading: true,
    });
  },
  CREATE_PROJECT_SUCCESS: function(state, action) {
    return Object.assign({}, state, {
      loading: false,
    });
  },

  PROJECTS_ERROR: function(state, action) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  },
  ADD_PROJECT: function(state, action) {
    return Object.assign({}, state, {
      isAddingProject: true
    });
  },
  CLOSE_PROJECT: function(state, action) {
    return Object.assign({}, state, {
      isAddingProject: false
    });
  }
});

export {reducer};
