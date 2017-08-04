const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Endpoint Git Subsystem', () => {
  xit('should create a new repo when a new endpoint is created.', () => {
    //create project
    //create endpoint
    //check to see if it makes a new directory
  });
  xit('should listen on port 7000', () => {

  });
  xit('should receive pushes from an endpoint', () => {
    //try pushing to endpoint.
  });
  xit('should not allow pulls from an endpoint [SECURITY]', () => {
    
  });
});

describe('Endpoint Model Relationships', function() {
  let endpoint;
  let project;
  let member;
  let team;

  before(async function() {
    //create
    endpoint = await Endpoint.create();
    project = await Project.create({
      name: 'cool project',
      slug: 'cool-proj',
      gitLink: 'github.com/something',
    });
    member = await Member.create({});
    team = await Team.create({});
    
    //associate
    await Endpoint.update(endpoint, {
      member: member.id,
      team: team.id,
      project: project.id,
    });
  });
  after(async function() {
    await Endpoint.destroy(endpoint.id);
    await Project.destroy(project.id);
    await Member.destroy(member.id);
    await Team.destroy(team.id);
  });
  it('should be able to get it\'s owning member', function(done) {
    Endpoint.find(endpoint.id)
      .populate('member')
      .exec(function(err, endpoint) {
        expect(endpoint[0].member.admin).to.be.equal(false);
        done();
    });
  });
  it('should be able to get it\'s team', function(done) {
    Endpoint.find(endpoint.id)
      .populate('team')
      .exec(function(err, endpoint) {
        expect(endpoint[0].team.id).to.be.equal(team.id);
        done();
    });
  });
  it('should be able to get the project it belongs to', function(done) {
    Endpoint.find(endpoint.id)
      .populate('project')
      .exec(function(err, endpoint) {
        expect(endpoint[0].project.name).to.be.equal('cool project');
        done();
    });
  });
});
