module.exports = {
	attributes: {
		name: {
			type: 'string',
			defaultsTo: 'null'
		},
		completed: {
			type: 'boolean',
			defaultsTo: false
		}
	},
	getAll: function (callback) {
		this.find({}).exec(callback);
	},
	createTodo: function (name, callback) {
		var values;
		if (name) {
			values = {
				name: name
			};
		}
		this.create(values).exec(callback);
	},
	deleteAll: function (callback) {
		this.destroy({}).exec(callback);
	},
	updateTodo: function (data, callback) {
		var id = data.id;
		this.update({
			id: id
		}, data).exec(callback);
	},
	deleteTodo: function (id, callback) {
		this.destroy({
			id: id
		}).exec(callback);
	}
};
