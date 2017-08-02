const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

describe('Member Model Relationships', function() {
  let member;
  let endpoint;
  let team;

  before(async function() {
    member = await Member.create({username: 'trustyPartner'});
    endpoint = await Endpoint.create({member: member.id});
    team = await Team.create({name: 'greatness'});
    member.teams.add(team.id);
    await member.save();
  });
  after(async function() {
    await Endpoint.destroy(endpoint.id);
    await Member.destroy(member.id);
    await Team.destroy(team.id);
  });
  it('should be able to get a list of it\'s endpoints', async function() {
    const members = await Member.find(member.id).populate('endpoints');
    expect(members[0].endpoints.length).to.be.equal(1);
  });
  it('should be able to list it\'s team memberships', async function() {
    const members = await Member.find(member.id).populate('teams');
    expect(members[0].teams.length).to.be.equal(1);
  });
});
