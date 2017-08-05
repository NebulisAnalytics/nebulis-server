const sails = require('sails');
const nebugit = require('../../gitnet');

before(function(done) {
  this.timeout(20000);	
  nebugit.listen();	
  sails.lift(function() {
    done();
  });
});

after((done) => {
  nebugit.stop();
  done();
});