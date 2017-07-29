const debug = require('../../api/utils/debug');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

const server = 'http://localhost:1337';

// /projects/index (get) (list all the units)
describe('GET /api/projects', function() {
  beforeEach(async () => {
    await Project.destroy({});
    // add 2 projects
    await Project.create({name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj'});
    await Project.create({name: 'Test Proj2', gitLink: 'github.com/user/testProj2', slug: 'testProj2'});
  });
  after(async () => {
    await Project.destroy({});
  });
  it('lists all the projects', function(done) {
    chai.request(server)
      .get('/api/projects')
      .end(function(err, res){
        expect(res.body.length).to.be.equal(2);
        done();
      });
  });
});

// /projects/<ID> (get) (view a unit with associated teams)
// /projects/new (post) (create a new unit page)
// # /projects/<ID>/teams/<teamID> (get) (projectInstance) -- don't bother for now
