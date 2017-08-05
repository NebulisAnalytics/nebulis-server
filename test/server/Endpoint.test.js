const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const request = require('request');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

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

describe('Endpoint Git Subsystem', function() {
  this.timeout(3000);
  let endpoint;
  let project;

  before(function (done) {	
    Project.create({
      name: 'cool project',
      slug: 'cool-proj',
      gitLink: 'github.com/something',
    }).exec((err, res) => { 
      project = res;
      Endpoint.create({ project: project.id }).exec((err, res) => { 
        endpoint = res;
        setTimeout(() => {
          done();
        }, 2500);
      });
    });
  });
  after(async () => {
    await Project.destroy(project.id);
  });
  it('should be able to connect to the git listener api', (done) => {
    request.post(`http://localhost:7010/reset`, (err, httpResponse, body) => {
      expect(JSON.parse(body).message).to.be.equal('updating server endpoint list');
      done();
    });
  });
  it('should create a new repo when a new endpoint is created.', (done) => {
    let found = false;
    fs.readdirSync('/tmp/repos').forEach(file => {
      if (file === endpoint.id + '.git') found = true;
    });
    expect(found).to.be.equal(true);
    done();
  });
  xit('should listen on port 7000', () => {});
  xit('should receive pushes from an endpoint', () => {
    //try pushing to endpoint.
  });
  xit('should not allow pulls from an endpoint [SECURITY]', () => {});
  it('should delete a repo when destroying an endpoint', (done) => {
    Endpoint.destroy(endpoint.id).exec((err, res) => {
      let found = false;
      fs.readdirSync('/tmp/repos').forEach(file => {
        if (file === endpoint.id + '.git') found = true;
      });
      expect(found).to.be.equal(false);
      done();
    });
  });
});