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

  afterCreate: (newRecord, cb) => {
    let res;
    const resetGit = async () => {
      try {
        res = await request.post(`http://localhost:7010/reset`);
        cb();
      } catch (err) {
        sails.log.info('waiting for git sub system');
        setTimeout(() => {
          resetGit();
        }, 250);
      };
    };
    resetGit();
  },

//TODO: make this work for multiple records
  afterDestroy: function(destroyedRecords, cb) {
    try {
      rimraf(process.env['REPO_LOCATION'] + '/' + destroyedRecords[0].id + '.git', () => {
        cb();
      });
    }
    catch (err) {
      cb(err);
    }
  },
};