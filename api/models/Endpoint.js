/**
 * Endpoint.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var rimraf = require('rimraf');
const request = require('request-promise');

module.exports = {

  attributes: {
    project: {
      model: 'project',
    },
    member: {
      model: 'member',
    },
    team: {
      model: 'team',
    },
  },

//lifecycle callbacks

  afterCreate: function(newRecord, cb) {
    let res;
    request.post(`http://localhost:7010/reset`, (err, httpResponse, body) => {
      if (err) { return cb(err); }
      cb();
    });
  },

//TODO: make this work for multiple records
  afterDestroy: function(destroyedRecords, cb) {
    rimraf('/tmp/repos/' + destroyedRecords[0].id + '.git', () => {
      cb();
    });
  },
};