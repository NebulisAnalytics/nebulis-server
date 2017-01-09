// require the app
require('../../app.js');

var ghoulies = require('ghoulies');

before(function(done) {
	
	// listen to server event defined in /config/http.js
	
	ghoulies.on('SERVER_LOADED', function(app) {
		ghoulies.app = app;
		done();
	});
	
});
