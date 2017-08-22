const sails = require('sails');
const nebugit = require('../../gitnet');
const fs = require('fs');
const rimraf = require('rimraf');

before(function(done) {
  this.timeout(20000);
  rimraf('.tmp/localDiskTestingDb.db', () => {
    fs.mkdir(`${process.env['REPO_LOCATION']}`, function (err) {
      nebugit.listen();	
      sails.lift(function() {
        done();
      });
    });	
  });
});

after((done) => {
  nebugit.stop();
  done();
});