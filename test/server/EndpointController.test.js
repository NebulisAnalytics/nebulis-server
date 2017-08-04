var debug = require('../../api/utils/debug');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

var server = 'http://localhost:1337';


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
      owner: "NebulisAnalytics", 
      project: "nebulis-endpoint"
    })
      .end(function(err, res){
        let s = res.body.remote;
        let id1 = s.slice(s.indexOf('7000/') + 5, s.indexOf('.git'));
        chai.request(server).post('/api/endpoints/establish').send({
          owner: "NebulisAnalytics", 
          project: "nebulis-endpoint"
        })
          .end(function(err, res){
            s = res.body.remote;
            let id2 = s.slice(s.indexOf('7000/') + 5, s.indexOf('.git'));
            expect(id1).to.be.equal(id2);

            Endpoint.find(id1).populate('member').exec((err, endpoint) => {
              Member.destroy(endpoint[0].member.id).exec((err) => {
                Endpoint.destroy(endpoint[0].id).exec((err) => {
                  expectNoAlter(done);
                });
              });
            })
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
      owner: "NebulisAnalytics", 
      project: "nebulis-endpoint"
    })
      .end(function(err, res){
        let s = res.body.remote;
        s = s.slice(s.indexOf('7000/') + 5,s.indexOf('.git'));

        Endpoint.find(s).populate('member').exec((err, endpoint) => {
          expect(res.body.remote).to.be.equal(`http://nebu:lis@localhost:7000/${endpoint[0].id}.git`);
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
      owner: "NebulisAnalytics+2", 
      project: "nebulis-endpoint"
    })
      .end((err, res) => {
        expect(res.body.error).to.be.equal('INPUT ERROR');
        expectNoAlter(done);
      });
  });
  it('should fail for a project that is not created', (done) => {
    req.send({
      owner: "NebulisAnalytics", 
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
        owner: "NebulisAnalytics", 
        project: "nebulis-endpoint"
      })
        .end((err, res) => {
          Member.find(member.id).populate('endpoints').exec((err, member) => {
            const eid = member[0].endpoints[0].id;
            expect(res.body.remote).to.be.equal(`http://nebu:lis@localhost:7000/${eid}.git`);
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