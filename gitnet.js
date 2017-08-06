const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./.babelrc'));

require('babel-core/register')(config);
require('babel-polyfill');

const nebugit = require('./nebugit');

module.exports = nebugit;