import ifetch from 'isomorphic-fetch';
import qs from 'qs';

const HTTP_STATUS_CODES = {
	400: 'BAD_REQUEST',
	401: 'UNAUTHORIZED',
	402: 'PAYMENT_REQUIRED',
	403: 'FORBIDDEN',
	404: 'NOT_FOUND',
	500: 'INTERNAL_SERVER_ERROR',
	502: 'BAD_GATEWAY',
	503: 'SERVICE_UNAVAILABLE',
	504: 'GATEWAY_TIMEOUT'
};

export function createActions(getStore, fetchOptions, endpoints) {
	let actions = {}, actionName, actionOptions;
	for (actionName in endpoints) {
		actionOptions = endpoints[actionName];
		actions[actionName] = createServerAction(getStore, actionOptions, fetchOptions);
	}
	return actions;
}

export function createFetch(fetchOptions, params) {
	return function (actionOptions, args) {
		let url = actionOptions.url;
		
		let value, newurl;
		for (let param in params) {
			value = params[param];
			newurl = url.replace(new RegExp('/(:' + param + '\/?)(/|$)', "gm"), '/' + value + '$2');
			url = newurl;
		}
		
		const method = actionOptions.method ? actionOptions.method.toUpperCase() : 'GET';
		
		const options = Object.assign({}, fetchOptions, {
			method
		});
		
		if (typeof args === 'object' && args !== null) {
			if (method === 'GET') {
				if (url.indexOf('?') === -1) url += '?';
				url += qs.stringify(args);
			}
			else {
				options.body = JSON.stringify(args);
			}
		}
		return ifetch(url, options);
	}
}
export function createServerAction(getStore, actionOptions, fetchOptions) {
	return createDispatcher(getStore, (args, params) => {
		return (dispatch) => {
			dispatch({
				type: actionOptions.request,
			});
			
			let status;
			const _fetch = createFetch(fetchOptions, params);
			
			return _fetch(actionOptions, args)
			.then((response) => {
				status = response.status;
				return response.json();
			})
			.then((json) => {
				if (status >= 400) {
					if (json.error && json.error.type) {
						
						if (actionOptions.error) {
							const errorType = json.error.type;
							
							const a = {
								type: actionOptions.error,
								success: false,
								requestType: actionOptions.request,
								requestArgs: args,
								requestParams: params,
								status: status,
								error: {
									type: errorType,
									data: json
								}
							};
							dispatch(a);
						}
					}
					else {
						const httpType = (status in HTTP_STATUS_CODES) ? HTTP_STATUS_CODES[status] : 'HTTP_ERROR';
						throw {
							type: httpType,
							success: false,
							status: status,
							requestType: actionOptions.request,
							requestArgs: args,
							requestParams: params,
							results: json
						};
					}
				}
				else {
					const a = {
						type: actionOptions.success,
						success: true,
						status: status,
						requestType: actionOptions.request,
						requestArgs: args,
						requestParams: params,
						results: json
					};
					dispatch(a);
				}
			});
		};
	});
}

export function createDispatcher(getStore, actionFunction) {
	
	const getStoreState = function () {
		return getStore().getState();
	};
	
	return function (args, params) {
		return new Promise((resolve, reject) => {
			getStore().dispatch(actionFunction.call(null, args, params)).then(() => {
				resolve(getStoreState());
			}).catch(function (err) {
				reject(err, getStoreState());
			});
		});
	}
	
}

export function createReducer(getInitialState, responses) {
	return function (state = getInitialState(), action) {
		let type, fn;
		for (type in responses) {
			if (type === action.type) {
				fn = responses[type];
				return fn(state, action);
			}
		}
		return state;
	}
}
