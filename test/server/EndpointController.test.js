const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const request = require('request');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

var server = 'http://localhost:1337';


describe('get /api/teams/:id/download', () => {
  let team;
  let member1;
  let member2;
  let endpoint;


  //TODO: assert that the download is a valid package file
  before(async function() {
    team = await Team.create({name: 'greatness'});
    member1 = await Member.create({username: 'user1', fullname: 'user 1'});
    member2 = await Member.create({username: 'user2', fullname: 'user 2'});
    endpoint = await Endpoint.create({team: team.id});

    await team.members.add([member1.id, member2.id]);
    await team.save();
  });
  after(async function() {
    await Team.destroy(team.id);
    await Member.destroy({username: 'user1'});
    await Member.destroy({username: 'user2'});
    await Endpoint.destroy({team: team.id});
  });
  xit('should be able to download a project package', async() => {
    const teams = await Team.find(team.id).populate('members');

  });
});

describe('Endpoint connection cases for POST /api/endpoints/establish', () => {
  let req;
  let endpoints;
  let project;
  let members;

  const expectNoAlter = (done) => {
    Endpoint.find().exec((err, res) => {
      expect(res.length).to.be.equal(endpoints.length);
      Member.find().exec((err, res) => {
        expect(res.length).to.be.equal(members.length);
        done();
      });
    });
  }

  before(async () => {
    project = await Project.create({
      name: 'nebulis-endpoint',
      slug: 'nebulis-endpoint',
      gitLink: 'https://github.com/NebulisAnalytics/nebulis-endpoint',
    });
    endpoints = await Endpoint.find();
    // projects = await Project.find();
    members = await Member.find();
  });
  beforeEach(() => {
    req = chai.request(server).post('/api/endpoints/establish');
  });
  after(async () => {
    await Project.destroy(project.id);
  })
  it('should respond with the same repo each time an endpoint connects', (done) => {
    req.send({
      owners: [{username: "NebulisAnalytics", fullName: "Nebulis Analytics"}],
      project: "nebulis-endpoint"
    })
      .end(function(err, res){
        let s = res.body.remote;
        console.log("err is lit: ", err);
        let id1 = s.slice(s.indexOf('7000/') + 5, s.indexOf('.git'));
        chai.request(server).post('/api/endpoints/establish').send({
          owners: [{username: "NebulisAnalytics", fullName: "Nebulis Analytics"}],
          project: "nebulis-endpoint"
        })
          .end(function(err, res){
            s = res.body.remote;
            let id2 = s.slice(s.indexOf('7000/') + 5, s.indexOf('.git'));
            console.log('These be my ids',id1, id2);
            expect(id1).to.be.equal(id2);

            Endpoint.find(id1).populate('member').exec((err, endpoint) => {
              Team.destroy(endpoint[0].team).exec((err) => {
                Member.destroy(endpoint[0].member.id).exec((err) => {
                  Endpoint.destroy(endpoint[0].id).exec((err) => {
                    expectNoAlter(done);
                  });
                });
              });
            });
          });
      });
  });
  it('should fail for a connection which is missing owner', (done) => {
    req.send({
      project: "nebulis-endpoint"
    })
      .end(function(err, res){
        expect(res.body.error).to.be.equal('INPUT ERROR');
        expectNoAlter(done);
      });
  });
  it('should create a new user and endpoint for a new connection without a user ', (done) => {
    req.send({
      owners: [{username: "NebulisAnalytics", fullName: "Nebulis Analytics"}],
      project: "nebulis-endpoint"
    })
      .end(function(err, res){
        let s = res.body.remote;
        s = s.slice(s.indexOf('7000/') + 5,s.indexOf('.git'));

        Endpoint.find(s).populate('member').exec((err, endpoint) => {
          expect(res.body.remote).to.be.equal(`http://nebu:lis@${process.env['GIT_HOST']}/${endpoint[0].id}.git`);
          Member.destroy(endpoint[0].member.id).exec((err) => {
            Endpoint.destroy(endpoint[0].id).exec((err) => {
              expectNoAlter(done);
            });
          });
        })
      });
  });
  it('should fail for a user name not on github', (done) => {
    req.send({
      owners: [{username: "NebulisAnalytics+2", fullName: "Nebulis Analytics"}],
      project: "nebulis-endpoint"
    })
      .end((err, res) => {
        expect(res.body.error).to.be.equal('INPUT ERROR: This is not a github user.');
        expectNoAlter(done);
      });
  });
  it('should fail for a project that is not created', (done) => {
    req.send({
      owners: [{username: "NebulisAnalytics", fullName: "Nebulis Analytics"}],
      project: "project-does-not-exist"
    })
      .end((err, res) => {
        expect(res.body.error).to.be.equal('INPUT ERROR');
        expectNoAlter(done);
      });
  });
  it('should create a new endpoint for a new connection that already has a user ', (done) => {
    Member.create({username: 'NebulisAnalytics'}).exec((err, member)=>{
      req.send({
        owners: [{username: "NebulisAnalytics", fullName: "Nebulis Analytics"}],
        project: "nebulis-endpoint"
      })
        .end((err, res) => {
          Member.find(member.id).populate('endpoints').exec((err, member) => {
            const eid = member[0].endpoints[0].id;
            expect(res.body.remote).to.be.equal(`http://nebu:lis@${process.env['GIT_HOST']}/${eid}.git`);
            Member.destroy(member.id).exec((err) => {
              Endpoint.destroy(eid).exec((err) => {
                expectNoAlter(done);
              });
            });
          })
        });
    });
  });
});

describe('GET /api/endpoints', () => {
  let e1;
  let e2;
  before(async () => {
    e1 = await Endpoint.create();
    e2 = await Endpoint.create();
  });
  after(async() => {
    await Endpoint.destroy(e1);
    await Endpoint.destroy(e2);
  });
  it('should return array of endpoints', function(done) {
    chai.request(server)
      .get('/api/endpoints')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        expect(res.body.length).to.be.equal(2);
        done();
      });
  });
  xit('should not allow external ip addresses to get the list', () => {});
});
