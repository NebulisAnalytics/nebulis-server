/**
 * Member.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    gitAccess: {
      type: 'string'
    },
    admin: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    endpoints: {
      collection: 'endpoint',
      via: 'member',
    },
    username: {
      type: 'string',
      unique: true,
    },
    fullname: {
      type: 'string',
    },
    teams: {
      collection: 'team',
      via: 'members',
    },
  },
};
