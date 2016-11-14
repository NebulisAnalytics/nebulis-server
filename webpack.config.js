const path = require('path');
const webpack = require('webpack');


const config = {
	devtool: 'eval',
	entry: [
		'./src/index'
	],
	output: {
		path: path.resolve(__dirname, './public/build'),
		filename: 'bundle.js',
		publicPath: '/build/',
		sourceMapFilename: 'bundle.js.map',
	},
	plugins: [],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			include: path.join(__dirname, 'src')
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	}
};

if (process.env['NODE_ENV'] === 'dev') {
	config.entry = [
		'react-hot-loader/patch',
		'webpack-hot-middleware/client',
		'./src/index'
	];
	config.plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
	if (process.env['NODE_ENV'] === 'prod') {
		// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
		// 	compressor: {
		// 		warnings: false
		// 	}
		// }));
	}
}

module.exports = config;
