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
  },
  ADD_TEAM_MEMBER: function(state, action) {
    const newState = {
      ...state,
      team: {
        ...state.team
      }
    };
    newState.team[action.results.id] = action.results;
    return newState;
  },
  REMOVE_TEAM_MEMBER: function(state, action) {
    const newState = {
      ...state,
      team: {
        ...state.team
      }
    };
    delete newState.team[action.results.id];
    return newState;
  },
  CLOSE_ADD_TEAM: function(state, action) {
    return {
      ...state,
      team: {}
    }
  },
  DOWNLOAD_PROJECT: function(state, action) {
    return {
      ...state,
      downloading: true
    }
  },
  DOWNLOAD_PROJECT_SUCCESS: function(state, action) {
    return {
      ...state,
      downloading:false
    }
  }
});

export {reducer};
