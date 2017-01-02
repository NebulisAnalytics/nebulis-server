var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

var server = 'http://localhost:1337';

describe('/api/todos', function() {
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

describe('/api/todos/create', function() {
	it('creates a todo', function(done) {
		chai.request(server)
			.get('/api/todos/create?name=test')
			.end(function(err, res){
				expect(res.body.name).to.be.equal('test');
				expect(res.body.completed).to.be.equal(false);
				done();
			});
	});
});

describe('/api/todos/deleteall', function() {
	it('deletes all todos', function(done) {
		chai.request(server)
			.get('/api/todos/deleteall')
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
