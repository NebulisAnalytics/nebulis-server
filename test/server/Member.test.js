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
    member.save(function(err) {});
  });
  after(async function() {
    Endpoint.destroy(endpoint.id);
    Member.destroy(member.id);
    Team.destroy(team.id);
  });
  it('should be able to get a list of it\'s endpoints', function(done) {
    Member.find({username: 'trustyPartner'})
      .populate('endpoints')
      .exec(function(err, members) {
        expect(members[0].endpoints.length).to.be.equal(1);
        done();
    });
  });
  it('should be able to list it\'s team memberships', function(done) {
    Member.find({username: 'trustyPartner'})
      .populate('teams')
      .exec(function(err, members) {
        expect(members[0].teams.length).to.be.equal(1);
        done();
    });
  });
});
