module.exports = {
	index: function (req, res) {
		res.render('index', {
			NODE_ENV: process.env['NODE_ENV']
		});
	}
};
