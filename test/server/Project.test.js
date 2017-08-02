const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Project Model Relationships', function() {
  let endpoint;
  let team;
  let project;

  before(async function() {
    //create
    project = await Project.create({
      name: 'cool project',
      slug: 'cool-proj',
      gitLink: 'github.com/something',
    });
    endpoint = await Endpoint.create();
    team = await Team.create();
    
    //associate
    await Project.update(project, {
      team: team.id,
      endpoint: endpoint.id,
    });
  });

  after(async function() {
    await Project.destroy(project.id);
    await Endpoint.destroy(endpoint.id);
    await Team.destroy(team.id);
  });

  xit('should be able to get a list of it\'s endpoints', async function() {
    const projects = await Project.find(project.id).populate('endpoints');
    sails.log(projects);
    expect(projects[0].endpoints.length).to.be.equal(1);
  });

  xit('should be able to list it\'s teams', async function() {
    const members = await Member.find({username: 'trustyPartner'}).populate('teams');
    expect(members[0].teams.length).to.be.equal(1);
  });
});


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
