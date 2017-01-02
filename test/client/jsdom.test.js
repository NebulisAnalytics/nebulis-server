import jsdom from 'jsdom';
import chai from 'chai';
const expect = chai.expect;

describe('JSDom', () => {
	it('renders an html string to a DOM', (done) => {
		jsdom.env(
			'<html><body><a id="link" href="http://localhost:1337">hello world</a></body></html>',
			["http://code.jquery.com/jquery.js"],
			function (err, window) {
				expect(window.$("#link").text()).to.be.equal('hello world');
				done();
			}
		);
	});
});


//
//
// var jsdom = require("jsdom");
// //var WebSocket = require('ws');
// jsdom.env({
// 	url: options.url,
// 	src: [],
// 	done: function (errors, window) {
// 		if (errors) {
// 			jax.log.error(errors);
// 			if (options.errorCallback) options.errorCallback(errors);
// 			return;
// 		}
// 		if (options.exposeProcess) {
// 			window.process = process;
// 		}
// 		window.WebSocket = WebSocket;
//
// 		jsdom.getVirtualConsole(window).sendTo(console);
// 		if (options.waitForJaxCore) {
// 			var jaxInterval, clientInterval;
// 			jax.log.debug('waiting for jaxcore...');
// 			jaxInterval = setInterval(function () {
// 				if (!window.jax) return;
// 				clearInterval(jaxInterval);
// 				if (jax.log) window.jax.log = jax.log;
// 				if (options.waitForClient) {
// 					jax.log.debug('waiting for client...');
// 					clientInterval = setInterval(function() {
// 						if (!window.client) return;
// 						clearInterval(jaxInterval);
// 						callback(window, window.client);
// 					},5);
// 				}
// 				else callback(window);
// 			}, 5);
// 		}
// 		else callback(window);
// 	},
// 	features: {
// 		FetchExternalResources: ["script"],
// 		ProcessExternalResources: ["script"],
// 		SkipExternalResources: false
// 	}
// });
