var debug = require('../../api/utils/debug');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

var server = 'http://localhost:1337';

describe('GET /api/todos', function() {
	it('should return array of todos', function(done) {
		chai.request(server)
			.get('/api/todos')
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.an('array');
				console.log('/todos', res.body);
				done();
			});
	});
});

describe('POST /api/todos', function() {
	it('creates a todo', function(done) {
		chai.request(server)
			.post('/api/todos')
			.send({
				name: 'test'
			})
			.end(function(err, res){
				expect(res.body.name).to.be.equal('test');
				expect(res.body.completed).to.be.equal(false);
				done();
			});
	});
});

describe('PUT /api/todos/:id', function() {
	it('updates a todo', function(done) {
		
		chai.request(server)
		.post('/api/todos')
		.send({
			name: 'test',
			completed: false
		})
		.end(function(err, res){
			
			var todo = res.body;
			var id = todo.id;
			expect(todo.completed).to.be.equal(false);
			
			chai.request(server)
			.put('/api/todos/'+id).send({
				completed: true
			})
			.end(function(err, res){
				chai.request(server)
				.get('/api/todos/'+id)
				.end(function(err, res){
					expect(res.body.completed).to.be.equal(true);
					done();
				});
			});
		});
	});
});

describe('DELETE /api/todos', function() {
	it('deletes all todos', function(done) {
		chai.request(server)
			.del('/api/todos')
			.end(function(err, res){
				chai.request(server)
					.get('/api/todos')
					.end(function(err, res){
						expect(res.body.length).to.be.equal(0);
						done();
					});
			});
	});
});
