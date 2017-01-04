var chalk = require('chalk');

function debug(s) {
	if (process.env['NODE_DEBUG'] === 'true') {
		var args = Array.prototype.slice.call(arguments);
		args = args.map(function (arg) {
			if (typeof arg === 'object' || typeof arg === 'number') return arg;
			else return chalk.green(arg);
		});
		console.log.apply(null, args);
	}
}

module.exports = debug;
