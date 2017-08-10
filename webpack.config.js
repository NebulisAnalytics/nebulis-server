const path = require('path');
const webpack = require('webpack');

var devtool;
if (process.env.NODE_ENV==='test') {
	devtool = 'eval';
}
else if (process.env.NODE_ENV==='dev') {
	devtool = 'source-map';
}
else { // prod
	devtool = 'eval';
}

const config = {
	devtool: devtool,
	entry: [
		'./src' ///index'
	],
	output: {
		path: path.resolve(__dirname, './public/build'),
		filename: 'bundle.js',
		publicPath: '/build/',
		sourceMapFilename: 'bundle.js.map',
	},
	/*
	 output: {
	 path: './out/',
	 filename: 'main.js',
	 chunkFilename: '[name]-[chunkhash].js',
	 publicPath: 'http://127.0.0.1:2992/out/'
	 },
	 */
	plugins: [],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel-loader'],
			include: path.join(__dirname, 'src')
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			// Loader for fonts (woff)
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff',
		}, {
			// Loader for fonts (woff2)
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-woff2',
		}, {
			// Loader for fonts (ttf)
			test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/octet-stream',
		}, {
			// Loader for fonts (otf)
			test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=application/font-otf',
		}, {
			// Loader for fonts (eot)
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file',
		}, {
			// Loader for images (svg)
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=10000&mimetype=image/svg+xml',
		}, {
			// Loader for images (png)
			test: /\.png$/,
			loader: 'file?name=[name].[ext]',
		}, {
			// Loader for images (jpg)
			test: /\.jpg$/,
			loader: 'file?name=[name].[ext]',
		}, {
			// Loader for images (gif)
			test: /\.gif$/,
			loader: 'file?name=[name].[ext]',
		}, {
			test: /\.scss$/,
			loaders: ["style-loader", "css-loader", "sass-loader"], // creates style nodes from JS strings
		},]
	},
	performance: {
		hints: false
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
