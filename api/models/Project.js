/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'string',
      required: true,
      unique: true
    },
    gitLink: {
      type: 'string',
      required: true,
      unique: true
    },
    endpoints: {
      collection: 'endpoint',
      via: 'project',
    },
    teams: {
      collection: 'team',
      via: 'project',
    },
  }
};

