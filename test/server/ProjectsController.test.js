const debug = require('../../api/utils/debug');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

const server = 'http://localhost:1337';

// /projects/index (get) (list all the units)
describe('GET /api/projects', function() {
  let p1;
  let p2;
  beforeEach(async () => {
    // add 2 projects
    p1 = await Project.create({name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj'});
    p2 = await Project.create({name: 'Test Proj2', gitLink: 'github.com/user/testProj2', slug: 'testProj2'});
  });
  after(async () => {
    await Project.destroy([p1.id, p2.id]);
  });
  it('returns all projects in db', function(done) {
    chai.request(server)
      .get('/api/projects')
      .end(function(err, res){
        expect(res.body.length).to.be.equal(2);
        done();
      });
  });
});

// /projects/index (get) (list all the units)
describe('POST /api/projects', function() {
  let project;
  after(async () => {
    await Project.destroy(project.id);
  });
  it('returns all projects in db', function(done) {
    chai.request(server)
      .post('/api/projects')
      .send({
        name: 'test12',
        gitLink: 'https://github.com/user/project12'
      })
      .end(function(err, res){
        sails.log(JSON.stringify(res.body));
        Project.find({slug: res.body.slug}, (err, q) => {
          sails.log(err);
          project = q[0]
          expect(res.body.name).to.be.equal(q[0].name);
          done();
        });
      });
  });
});



// /projects/<ID> (get) (view a unit with associated teams)
// # /projects/<ID>/teams/<teamID> (get) (projectInstance) -- don't bother for now
