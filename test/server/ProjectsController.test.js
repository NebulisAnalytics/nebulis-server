const debug = require('../../api/utils/debug');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
const server = 'http://localhost:1337';

// /projects/index (get) (list all the units)
describe('GET /api/projects', () => {
  beforeEach(async () => {
    await Project.destroy({});
    // add 2 projects
    await Project.create({ name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj' });
    await Project.create({ name: 'Test Proj2', gitLink: 'github.com/user/testProj2', slug: 'testProj2' });
  });
  after(async () => {
    await Project.destroy({});
  });
  it('lists all the projects', (done) => {
    chai.request(server)
      .get('/api/projects')
      .end((err, res) => {
        expect(res.body.length).to.be.equal(2);
        done();
      });
  });
});

// /projects/<ID> (get) (view a unit with associated teams)
describe('GET unit project members by project ID', () => {
  before(async () => {
    //  destroy previous projects
    await Project.destroy({});
    //  add 1 project
    await Project.create({ name: 'Test Proj', gitLink: 'github.com/user/testProj', slug: 'testProj' })
    it('should list members of project:id', (done) => {
      chai.request(server)
        .get('api/projects')
        .end((err, res) => {
          const project = res.body;
          const id = project.id;
          expect(project.length).to.be.equal(1);
          expect(project.name).to.be.equal('Test Proj');
          expect(project.teams.length).to.be.equal()
          expect(project.teams.members.length).to.be.equal()
        })
    })
      // .exec(err, (err, project) => {
      //   const id = project.id;
      //   expect(project).to.be.an('object');
      //   expect(project.id).to.be.equal(id);
      });

    console.log('this is the id', project.id);
  });


  //  clean up the db (delete id and associated teams)
});


// /projects/new (post) (create a new unit page)
// # /projects/<ID>/teams/<teamID> (get) (projectInstance) -- don't bother for now
