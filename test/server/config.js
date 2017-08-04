const sails = require('sails');
const nebugit = require('../../gitnet');

before(function(done) {
  this.timeout(20000);
  sails.lift(function() {
    nebugit.listen();		
    done();
  });
});
