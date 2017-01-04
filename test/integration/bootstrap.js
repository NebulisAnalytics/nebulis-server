var sails = require('sails');
var jsdom = require('jsdom');

var URL = "http://localhost:1337/todos";

function loadApp(done) {
	jsdom.env({
		url: URL,
		done: function (err, window) {
			global.window = window;
			global.document = window.document;
			if (window.jQuery) global.$ = window.jQuery;
			done();
		},
		features: {
			FetchExternalResources: ["script"],
			ProcessExternalResources: ["script"],
			SkipExternalResources: false
		}
	});
}

before(function (done) {
	this.timeout(20000);
	sails.lift(function () {
		loadApp(done);
	});
});
