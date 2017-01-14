import es6promise from 'es6-promise';
es6promise.polyfill();

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ghoulie from 'ghoulie';

// REDUCERS ----------------------------

// import the generated reducer and actions
import {reducer as todosModel, actions as todosActions} from './todos';

// export the actions so they can be used elsewhere in the app
export {todosActions};

// ghoulieReducer intercepts redux events and outputs them to console.log for debugging
let ghoulieReducer = ghoulie.reducer();

// combine the reducers
const rootReducer = combineReducers({
	todosModel,
	ghoulieReducer
});

// create the redux store
export const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export function getStore() {
	return store;
}

window.getStore = getStore;
