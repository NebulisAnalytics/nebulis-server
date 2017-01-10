var sails = require('sails');

before(function(done) {
	this.timeout(20000);
	sails.lift(function() {
		done();
	});
});
