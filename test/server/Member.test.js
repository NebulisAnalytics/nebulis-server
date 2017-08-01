var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

xdescribe('Relationships', function() {
  before(function(done) {
    Member.create(null).exec(function(member) {
      member.endpoints.add({});
      member.teams.add({});
      member.save(function(err) {
        done();
      });
    });
  });
  it('should be able to get a list of it\'s endpoints', function(done) {
    Member.find()
      .populate('endpoints')
      .exec(function(err, members) {
        expect(members[0].endpoints.length).to.be.equal(1);
    });
  });
  xit('should be able to list it\'s team memberships', function(done) {
    Todo.getAll(function(err, todos) {
      expect(todos).to.be.an('array');
      done();
    });
  });
});
