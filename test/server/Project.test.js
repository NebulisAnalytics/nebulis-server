const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

xdescribe('.getAll()', function() {
  it('should return array of projects', function(done) {
    Todo.getAll(function(err, projects) {
      expect(projects).to.be.an('array');
      done();
    });
  });
});

describe('create project', function() {
  it('creates a project', function(done) {
    Project.create({name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj'}).exec(function(err, project) {
      expect(project).to.be.an('object');
      expect(project.name).to.be.equal('Test Proj');
      expect(project.gitLink).to.be.equal('github.com/user/testProj');
      expect(project.slug).to.be.equal('testProj');
      Project.find({}).exec(function(err, projects) {
        expect(projects.length).to.be.above(0);
        done();
      });
    });
  });
});

xdescribe('.deleteTodo()', function() {
  it('deletes a project', function(done) {
    Todo.createTodo('test', function(err, results) {
      const id = results.id;
      Todo.deleteTodo(id, function(err, results) {
        expect(results).to.have.length(1);
        Todo.findOne({id:id}, function(err, project) {
          expect(project).to.be.equal(undefined);
          done();
        });
      });
    })
  });
});

xdescribe('.deleteAll()', function() {
  it('deletes all projects', function(done) {
    Todo.createTodo(null, function(err, project) {
      Todo.deleteAll(function(err, results) {
        Todo.getAll(function(err, projects) {
          expect(projects.length).to.be.equal(0);
          done();
        });
      });
    });
  });
});
