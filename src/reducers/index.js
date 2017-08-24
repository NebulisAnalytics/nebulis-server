import {responsiveStateReducer} from 'redux-responsive';
import {combineReducers} from 'redux';
import {responsiveDrawer} from 'material-ui-responsive-drawer';
import {reducer as projectsModel} from './../reducers/projectReducers';
import {reducer as teamsModel} from './../reducers/teamReducers';
import {reducer as membersModel} from './../reducers/memberReducers';

import ghoulie from 'ghoulie';
// ghoulieReducer intercepts redux events and outputs them to console.log for debugging
let ghoulieReducer = ghoulie.reducer();

const rootReducer = combineReducers({
	browser: responsiveStateReducer,
  responsiveDrawer: responsiveDrawer,
	projectsModel,
	teamsModel,
	membersModel,
	ghoulieReducer
});

export default rootReducer;
