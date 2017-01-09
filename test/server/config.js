var sails = require('sails');
var jsdom = require('jsdom');

function createDOM(done) {
	jsdom.env(
		'<html><body></body></html>',
		[],
		function (err, window) {
			global.document = window.document;
			global.window = window;
			done();
		}
	);
}

before(function(done) {
	this.timeout(20000);
	sails.lift(function() {
		createDOM(done);
	});
});
