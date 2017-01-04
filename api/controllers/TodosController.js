var debug = require('../utils/debug');

module.exports = {
	getTodos: function (req, res) {
		Todo.getAll(function (err, todos) {
			if (err) {
				res.status(500);
				res.send(err);
			}
			else res.send(todos);
		});
	},
	getTodo: function (req, res) {
		var id = req.params.id;
		Todo.findOne({id: id}, function (err, todo) {
			debug('getTodo '+id, todo);
			res.send(todo);
		});
	},
	createTodo: function (req, res) {
		var name = req.body.name;
		Todo.createTodo(name, function (err, results) {
			debug('createTodo', results);
			res.send(results);
		});
	},
	updateTodo: function (req, res) {
		var id = req.params.id;
		var values = req.body;
		Todo.update(id, values).exec(function (err, results) {
			debug('updated Todo ' + id, results);
			res.send(results);
		});
	},
	deleteTodo: function (req, res) {
		var id = req.params.id;
		Todo.deleteTodo(id, function (err, results) {
			res.send(results);
		});
	},
	deleteAll: function (req, res) {
		Todo.deleteAll(function (err, results) {
			debug('deleteAll', results);
			res.send(results);
		});
	}
};
