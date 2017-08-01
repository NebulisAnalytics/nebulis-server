const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

//  get all projects (do we need to specify the repo we're returning forks of?)
xdescribe('get all projects', function() {
  it('should return array of all projects', function(done) {
    Project.find((err, projects) => {
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

describe('delete project', function() {
  it('deletes a project', function(done) {
    Project.create({name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj'}).exec(function (err, project) {

    const id = project.id;

      Project.destroy(id, function(err, results) {
        expect(results).to.have.length(1);
        Project.findOne({id:id}, function(err, project) {
          expect(project).to.be.equal(undefined);
          done();
        });
      });
    });
  });
});


//not sure if necessary?
xdescribe('.deleteAll()', function() {
  it('deletes all projects', function(done) {
    Project.createTodo(null, function(err, project) {
      Project.deleteAll(function(err, results) {
        Project.getAll(function(err, projects) {
          expect(projects.length).to.be.equal(0);
          done();
        });
      });
    });
  });
});
