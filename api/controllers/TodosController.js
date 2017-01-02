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
	createTodo: function (req, res) {
		Todo.createTodo({
			name: req.query.name
		}, function (err, records) {
			res.send(records);
		});
	},
	deleteAll: function (req, res) {
		Todo.deleteAll(function (err, results) {
			res.send(results);
		});
	},
};
