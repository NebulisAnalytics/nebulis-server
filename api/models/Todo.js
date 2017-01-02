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
	createTodo: function (data, callback) {
		this.create(data).exec(callback);
	},
	deleteAll: function (callback) {
		this.destroy({}).exec(callback);
	}
};
