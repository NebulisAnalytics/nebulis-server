import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import es6promise from 'es6-promise';
es6promise.polyfill();

// import the generated reducer and actions

import {actions as addProject, makeAdmin, removeAdmin, closeProject} from './../actions/nebulisActions';

// export the actions so they can be used elsewhere in the app
export {addProject, closeProject, makeAdmin, removeAdmin};



// create the redux store
export const store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

export function getStore() {
	return store;
}

// window.getStore = getStore;


//
// function getStoreProd(initialState) {
//   const middlewares = [
//     // Add other middleware on this line...
//
//     // thunk middleware can also accept an extra argument to be passed to each thunk action
//     // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
//     thunk,
//   ];
//
//   return createStore(rootReducer, initialState, compose(
//     applyMiddleware(...middlewares)
//     )
//   );
// }
//
// function getStoreDev(initialState) {
//   const middlewares = [
//     // Add other middleware on this line...
//
//     // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
//     reduxImmutableStateInvariant(),
//
//     // thunk middleware can also accept an extra argument to be passed to each thunk action
//     // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
//     thunk,
//   ];
//
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
//   const store = createStore(rootReducer, initialState, composeEnhancers(
//     applyMiddleware(...middlewares)
//     )
//   );
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextReducer = require('../reducers').default; // eslint-disable-line global-require
//       store.replaceReducer(nextReducer);
//     });
//   }
//
//   return store;
// }
//
// const getStore = process.env.NODE_ENV === 'production' ? getStoreProd : getStoreDev;
//
//
//
//
//
//
//
//
// export default getStore;
