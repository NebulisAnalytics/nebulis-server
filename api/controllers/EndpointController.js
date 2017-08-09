/**
 * EndpointController
 *
 * @description :: Server-side logic for managing endpoints
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const request = require('request-promise');
const git = require('nodegit');
var zipFolder = require('zip-folder');
var rimraf = require('rimraf');

module.exports = {

// the route for connections from the endpoints. Sets up a new repo and sends
// repo remote back to endpoint.
// POST /api/endpoints/establish
// debug: { owner: 'NebulisAnalytics', project: 'nebulis-endpoint' }
  establish: async (req, res) => {
    if (!req.body.project) { 
      sails.log.info('Request missing project name');
      return res.send({error: 'ENDPOINT ERROR'}); }
    if (!req.body.owner) { 
      sails.log.info('Request missing project owner');
      return res.send({error: 'INPUT ERROR'}); }

    //find project
    const projects = await Project.find({ slug: req.body.project });
    if (projects.length < 1) { 
      sails.log.info(`Request for unknown project: ${req.body.project}`);
      return res.send({error: 'INPUT ERROR'}); }

    let members = await Member.find({ username: req.body.owner });
    //if user not found try to find on github to confirm existence before creating new user.
    if (members.length < 1) { 
      sails.log.info(`Request for unknown user: ${req.body.owner}`);
      const re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
      let response;
      try {
        response = await request(`https://github.com/${req.body.owner}`);
      } catch (err) {
        sails.log.error('User not found on Github. Disregarding this endpoint request.');
        return res.send({error: 'INPUT ERROR: This is not a github user.'});
      }
      //assuming the user exists on github,` so creating in the db.
      members = [await Member.create({username: req.body.owner})];
    }

    let endpoints = await Endpoint.find({
      where: {
        project: projects[0].id,
        member: members[0].id,
      },
    });
    if (endpoints.length < 1) {
      sails.log.info(`Request for new endpoint creation.`);

      endpoints = [await Endpoint.create({
        member: members[0].id,
        project: projects[0].id,
      })];
    }
    res.json({
      id: endpoints[0].id,
      remote: `http://nebu:lis@localhost:7000/${endpoints[0].id}.git`});
  },

//used by git server to get the list of endpoints
  index: (req, res) => {
    Endpoint.find({}).exec(function (err, endpoints) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      else res.send(endpoints);
    });
  },

  download: (req, res) => {
    const store = '/tmp';
    Team.find(req.param('id')).populate('endpoints').exec((err, team) => {
      console.log(team);
      if (team[0].endpoints.length > 0) {
        const eid = team[0].endpoints[0].id;
        const path = `${store}/repos/${eid}.git`;
        console.log(path);
        git.Clone.clone(path, `${store}/browse`).then(function(repository) {
          console.log('repo',repository)
          zipFolder(`${store}/browse/`, `${store}/archive.zip`, function(err) {
            rimraf(`${store}/browse/.git/`, () => {
              rimraf(`${store}/browse/`, () => {
                if(!err) {
                  res.sendfile(`${store}/archive.zip`);
                } else {
                  res.send('error preparing files');
                }
              });
            });
          });
        });
      } else {
        res.send({error: 'no endpoints found'});
      }
    });

  }

};
