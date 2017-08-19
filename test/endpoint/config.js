const sails = require('sails');
const nebugit = require('../../gitnet');
const fs = require('fs');
var rimraf = require('rimraf');

before(function(done) {
  this.timeout(20000);
  rimraf(`.tmp/localDiskTestingDb.db`, () => {
    fs.mkdir('/tmp/repos', function (err) {
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

exports.nebugit = nebugit;
