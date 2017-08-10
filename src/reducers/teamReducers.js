import {createReducer} from '../utils/redux-helpers.js';
import getInitialState from './initialState'


// TEAMS REDUCER


const reducer = createReducer(getInitialState, {
  GET_TEAMS: function(state, action) {
    return {
      ...state,
      loading: true
    }
  },
  GET_TEAMS_SUCCESS: function(state, action) {
    return {
      ...state,
      loading: false,
      teams: action.results
    }
  },
  TEAMS_ERROR: function(state, action) {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }
});

export {reducer};
