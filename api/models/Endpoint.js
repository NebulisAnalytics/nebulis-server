/**
 * Endpoint.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var rimraf = require('rimraf');
const request = require('request');

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

  afterDestroy: function(destroyedRecords, cb) {
    let count = 0;
    destroyedRecords.forEach((record) => {
      rimraf.sync('/tmp/repos/' + record.id + '.git');
    });
    cb();
  },
};