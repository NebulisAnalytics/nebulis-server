const sails = require('sails');
const nebugit = require('../../gitnet');
const fs = require('fs');

before(function(done) {
  this.timeout(20000);
  fs.mkdir('/tmp/repos', function (err) {
    nebugit.listen();	
    sails.lift(function() {
      done();
    });
});	
});

after((done) => {
  nebugit.stop();
  done();
});