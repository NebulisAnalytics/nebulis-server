require('es6-promise').polyfill();
require('isomorphic-fetch');

function getTodos(callback) {
	fetch('/api/todos')
	.then(function (response) {
		if (response.status >= 400) {
			throw new Error("Bad response from server");
		}
		return response.json();
	})
	.then(function (todos) {
		callback(null, todos);
	})
	.catch(function(err) {
		console.log(err);
		callback(err);
	});
}

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
	.catch(function(err) {
		console.log(err);
		callback(err);
	});
}

function deleteTodo(id, callback) {
	fetch('/api/todos/'+id, {
		method: 'DELETE',
		credentials: 'include'
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
	.catch(function(err) {
		console.log(err);
		callback(err);
	});
}

function updateTodo(id, values, callback) {
	fetch('/api/todos/'+id, {
		method: 'PUT',
		credentials: 'include',
		body : JSON.stringify(values)
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
	.catch(function(err) {
		console.log(err);
		callback(err);
	});
}

function toggleCompleted(id, currentValue, callback) {
	updateTodo(id, {
		completed: !currentValue
	}, callback);
}

module.exports = {
	getTodos: getTodos,
	createTodo: createTodo,
	deleteTodo: deleteTodo,
	toggleCompleted: toggleCompleted
};
