var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

describe('.getAll()', function() {
	it('should return array of todos', function(done) {
		Todo.getAll(function(err, todos) {
			expect(todos).to.be.an('array');
			done();
		})
	});
});

describe('.createTodo()', function() {
	it('creates a todo', function(done) {
		Todo.createTodo({}, function(err, todo) {
			expect(todo).to.be.an('object');
			expect(todo.name).to.be.equal('null');
			expect(todo.completed).to.be.equal(false);
			Todo.getAll(function(err, todos) {
				expect(todos.length).to.be.above(0);
				done();
			});
		})
	});
});

describe('.deleteAll()', function() {
	it('deletes all todos', function(done) {
		Todo.deleteAll(function(err, results) {
			Todo.getAll(function(err, todos) {
				expect(todos.length).to.be.equal(0);
				done();
			});
		})
	});
});
