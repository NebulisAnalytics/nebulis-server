/*

// example of how to manually perform a fetch() outside of the redux-helpers lib

import es6promise from 'es6-promise';
es6promise.polyfill();
import fetch from 'isomorphic-fetch';

function createTodo(name, callback) {
	fetch('/api/todos', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: name
		})
	})
	.then(function (response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function (todos) {
		callback(null, todos);
	})
	.catch(function (err) {
		console.log(err);
		callback(err);
	});
}
*/
