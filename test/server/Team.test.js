const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Team Model Relationships', function() {
  let team;
  let member1;
  let member2;
  let endpoint;
  
  before(async function() {
    team = await Team.create({name: 'greatness'});
    member1 = await Member.create({username: 'user1'});
    member2 = await Member.create({username: 'user2'});
    endpoint = await Endpoint.create({team: team.id});

    await team.members.add([member1.id, member2.id]);
    await team.save();
  });
  after(async function() {
    await Team.destroy(team.id);
    await Member.destroy({username: 'user1'});
    await Member.destroy({username: 'user2'});

    //TODO: should not delete entire db of entries.
    await Endpoint.destroy({team: team.id});
    // await Endpoint.destroy({});
  });
  it('should be able to get a list of it\'s members', async function() {
    const teams = await Team.find(team.id).populate('members')
    expect(teams[0].members.length).to.be.equal(2);
  });
  it('should be able to list it\'s endpoints', async function() {
    const teams = await Team.find(team.id).populate('endpoints');
    expect(teams[0].endpoints.length).to.be.equal(1);
  });
});
