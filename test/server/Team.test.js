var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

describe('Team Model Relationships', function() {
  before(async function() {
    const team = await Team.create({name: 'greatness'});
    const member1 = await Member.create({username: 'user1'});
    const member2 = await Member.create({username: 'user2'});
    const endpoint = await Endpoint.create({team: team.id});

    // team.members.add([member1.id, member2.id]);
    team.members.add(member1.id);
    team.save(function(err) {});
  });
  after(async function() {
    let team = await Team.find({name: 'greatness'});
    await Team.destroy(team.id);
    await Member.destroy({username: 'user1'});
    await Member.destroy({username: 'user2'});

    //TODO: should not delete entire db of entries.
    // await Endpoint.destroy({team: team.id});
    await Endpoint.destroy({});
  });
  xit('should be able to get a list of it\'s members', function(done) {
    Team.find({name: 'greatness'})
      .populate('members')
      .exec(function(err, teams) {
        console.log(teams);
        expect(teams[0].members.length).to.be.equal(2);
        done();
    });
  });
  it('should be able to list it\'s endpoints', function(done) {
    Team.find({name: 'greatness'})
      .populate('endpoints')
      .exec(function(err, teams) {
        expect(teams[0].endpoints.length).to.be.equal(1);
        done();
    });
  });
});
