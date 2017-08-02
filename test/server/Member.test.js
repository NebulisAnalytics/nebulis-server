var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

describe('Relationships', function() {
  before(async function() {
    const member = await Member.create({username: 'trustyPartner'});
    const endpoint = await Endpoint.create({member: member.id});
    const team = await Team.create({});
    member.teams.add(team.id);
    member.save(function(err) {});
  });
  after(function(done) {
    Member.find({username: 'trustyPartner'})
      .populate('endpoints')
      .exec(function(err, members) {
        Endpoint.destroy({member: members[0].id}).exec();
        Member.destroy({id: members[0]}).exec(function(err, member) {});
      });
    Member.destroy({username: 'trustyPartner'}).exec(function(err, member) {});
    done();
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
