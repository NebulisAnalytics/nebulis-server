var jsdom = require('jsdom');

function createDOM(done) {
	jsdom.env(
		'<html><body></body></html>',
		["http://code.jquery.com/jquery.js"],
		function (err, window) {
			global.document = window.document;
			global.window = window;
			global.$ = window.jQuery;
			done();
		}
	);
}

before(function(done) {
	this.timeout(20000);
	createDOM(done);
});
