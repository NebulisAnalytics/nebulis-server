import { combineReducers } from 'redux';
import {reducer as projectsModel} from './../reducers/projectReducers';
import {reducer as teamsModel} from './../reducers/teamReducers';

import ghoulie from 'ghoulie';
// ghoulieReducer intercepts redux events and outputs them to console.log for debugging
let ghoulieReducer = ghoulie.reducer();

const rootReducer = combineReducers({
	projectsModel,
	teamsModel,
	ghoulieReducer
});

export default rootReducer;
