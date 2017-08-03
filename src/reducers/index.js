import { combineReducers } from 'redux';
import {reducer as projectsModel} from './../reducers/projectReducers';
import ghoulie from 'ghoulie';
// ghoulieReducer intercepts redux events and outputs them to console.log for debugging
let ghoulieReducer = ghoulie.reducer();

const rootReducer = combineReducers({
	projectsModel,
	ghoulieReducer
});

export default rootReducer;
