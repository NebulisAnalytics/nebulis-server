/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.http.html
 */

var express = require('express'); // if you have npm version > 2
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Express middleware to use for every Sails request. To add custom          *
  * middleware to the mix, add a function to the middleware config object and *
  * add its key to the "order" array. The $custom key is reserved for         *
  * backwards-compatibility with Sails v0.9.x apps that use the               *
  * `customMiddleware` config option.                                         *
  *                                                                           *
  ****************************************************************************/

  customMiddleware: function (app) {
	
	  // use layout.ejs
	  app.use(expressLayouts);
	  
	  // emit a 'SERVER_LOADED' event to ghoulies in order to bootstrap the ghoulie tests
	  var ghoulies = require('ghoulies');
	  
	  sails.on('lifted', function() {
		  ghoulies.emit('SERVER_LOADED', sails);
	  });
	
	
    // https://github.com/gaearon/react-hot-boilerplate/blob/next/server.js
    // https://github.com/balderdashy/sails/issues/814

    // STATIC DIRECTORIES ------------------------
    var root = __dirname+'/..';

    app.use('/styles', express.static(root+'/public/styles'));

    console.log('$NODE_ENV = '+process.env['NODE_ENV']);

    if (process.env['NODE_ENV']==='dev') {
      console.log('Starting webpack hot loader...');

      var webpack = require('webpack');
      var config = require('../webpack.config');
      var devMiddleware = require('webpack-dev-middleware');
      var hotMiddleware = require('webpack-hot-middleware');

      var compiler = webpack(config);

      app.use(devMiddleware(compiler, {
        publicPath: config.output.publicPath,
        historyApiFallback: true,
      }));

      app.use(hotMiddleware(compiler));
    }
    else {
      console.log('Starting static built at /build/bundle.js');
      app.use('/build', express.static(root+'/public/build'));
    }

  },

  middleware: {


  /***************************************************************************
  *                                                                          *
  * The order in which middleware should be run for HTTP request. (the Sails *
  * router is invoked by the "router" middleware below.)                     *
  *                                                                          *
  ***************************************************************************/

    order: [
      'startRequestTimer',
      'cookieParser',
      'session',
      'myRequestLogger',
      'bodyParser',
      //'jsonParser',
      //'handleBodyParserError',
      //'compress',
      //'methodOverride',
      //'poweredBy',
      '$custom',
      'router',
      'www',
      'favicon',
      '404',
      '500'
    ],
	  
	  

  /****************************************************************************
  *                                                                           *
  * Example custom middleware; logs each request to the console.              *
  *                                                                           *
  ****************************************************************************/

    myRequestLogger: function (req, res, next) {
        console.log(req.method, req.url);
        //console.log("Requested start ", new Date().getTime());
        return next();
    },


  /***************************************************************************
  *                                                                          *
  * The body parser that will handle incoming multipart HTTP requests. By    *
  * default as of v0.10, Sails uses                                          *
  * [skipper](http://github.com/balderdashy/skipper). See                    *
  * http://www.senchalabs.org/connect/multipart.html for other options.      *
  *                                                                          *
  * Note that Sails uses an internal instance of Skipper by default; to      *
  * override it and specify more options, make sure to "npm install skipper" *
  * in your project first.  You can also specify a different body parser or  *
  * a custom function with req, res and next parameters (just like any other *
  * middleware function).                                                    *
  *                                                                          *
  ***************************************************************************/

  // bodyParser:  function (req, res, next) {
	//   jsonParser(req, res, next);
	//
	//   // console.log('hi', typeof req, typeof res);
	//   // process.exit();
	//   //
	//   // return jsonParser; //require('body-parser')({ limit: 8248242 });
  // }
	  
    //bodyParser: require('skipper')({strict: true})

 	// bodyParser: bodyParser.urlencoded({
	 //  extended: true
  	// }), //require('express').bodyParser()
 	// jsonParser: bodyParser.json(), //require('express').bodyParser()
	 //
	// bodyParser:  function () {
	//   return function (req, res, next) {
	// 	  console.log('body parser active');
	// 	  process.exit();
	// 	  next();
	//   }
	// },
	  
  },

  /***************************************************************************
  *                                                                          *
  * The number of seconds to cache flat files on disk being served by        *
  * Express static middleware (by default, these files are in `.tmp/public`) *
  *                                                                          *
  * The HTTP static cache is only active in a 'production' environment,      *
  * since that's the only time Express will cache flat-files.                *
  *                                                                          *
  ***************************************************************************/

  // cache: 31557600000
};
