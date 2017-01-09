var sails = require('sails');

before(function (done) {
	
	// run SailsJS server
	sails.lift(function () {
		done();
	});
	
});
