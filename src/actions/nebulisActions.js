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
  deleteAllProjects: {
    method: 'delete',
    url: '/api/projects',
    request: types.DELETE_PROJECTS,
    success: types.DELETE_PROJECTS_SUCCESS,
    error: types.PROJECTS_ERROR
  },
  downloadTeamProject: {
    method: 'get',
    url: '/api/teams/:id/download',
    request: types.DOWNLOAD_PROJECT,
    success: types.DOWNLOAD_PROJECT_SUCCESS,
    error: types.PROJECTS_ERROR
  },
  createMember: {
    method: 'post',
    url: '/api/members',
    request: types.CREATE_MEMBER,
    success: types.CREATE_MEMBER_SUCCESS,
    error: types.MEMBERS_ERROR
  },
  getMembers: {
    method: 'get',
    url: '/api/members/:id',
    request: types.GET_MEMBER,
    success: types.GET_MEMBER_SUCCESS,
    error: types.MEMBERS_ERROR
  },
  deleteMember: {
    method: 'delete',
    url: '/api/members/:id',
    request: types.DELETE_MEMBER,
    success: types.DELETE_MEMBER_SUCCESS,
    error: types.MEMBERS_ERROR
  },
  //	get teams
  getTeams: {
    method: 'get',
    url: '/api/projects/:id/teams',
    request: types.GET_TEAMS,
    success: types.GET_TEAMS_SUCCESS,
    error: types.TEAMS_ERROR
  }
});

function addTeamMember(teamMember) {
  return {
    type: types.ADD_TEAM_MEMBER,
    results: teamMember
  }
}

module.exports = {
  ...actions,
  addTeamMember
};


export function addProject(){
  return {type: types.ADD_PROJECT}
}
export function closeProject(){
  return {type: types.CLOSE_PROJECT}
}
export function makeAdmin(){
  return {type: types.MAKE_ADMIN}
}
export function removeAdmin(){
  return {type: types.REMOVE_ADMIN}
}
