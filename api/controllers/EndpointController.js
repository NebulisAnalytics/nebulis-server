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
// debug: { owners: [{username: 'NebulisAnalytics', fullname: 'Nebulis Analytics'}], project: 'nebulis-endpoint' }
  establish: async (req, res) => {
    if (!req.body.project) {
      sails.log.info('Request missing project name');
      return res.send({error: 'ENDPOINT ERROR'}); }
    if (!req.body.owners) {
      sails.log.info('Request missing project owners');
      return res.send({error: 'INPUT ERROR'}); }
    //find project
    const projects = await Project.find({ slug: req.body.project });
    if (projects.length < 1) {
      sails.log.info(`Request for unknown project: ${req.body.project}`);
      return res.send({error: 'INPUT ERROR'}); }

    const users = req.body.owners;
    const memberIDs = [];
    const userFullnames = [];
    let members;
    for (let i = 0; i < users.length; i++) {
      members = await Member.find({ username: users[i].username });
      //if user not found try to find on github to confirm existence before creating new user.
      if (members.length < 1) {
        sails.log.info(`Request for unknown user: ${users[i].username}`);
        const re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
        let response;
        try {
          response = await request(`https://github.com/${users[i].username}`);
        } catch (err) {
          sails.log.error('User not found on Github. Disregarding this endpoint request.');
          return res.send({error: 'INPUT ERROR: This is not a github user.'});
        }
        //assuming the user exists on github,` so creating in the db.
        members = [await Member.create({
          username: users[i].username,
          fullname: users[i].fullName
        })];
      }
      userFullnames.push(users[i].fullName);
      memberIDs.push(members[0].id);
    }

    let endpoints = await Endpoint.find({
      where: {
        project: projects[0].id,
        member: memberIDs[0],
      },
    });
    if (endpoints.length < 1) {
      sails.log.info(`Request for new endpoint creation.`);

      endpoints = [await Endpoint.create({
        member: memberIDs[0],
        project: projects[0].id,
      })];

      const teamName = userFullnames.reduce((acc, name) => {
        acc += ` & ${name}`;
        return acc;
      });

      // Create new team from members
      let team = await Team.create({
        name: teamName,
        project: projects[0].id,
      })
      await team.members.add(memberIDs);
      await team.endpoints.add(endpoints[0].id);
      await team.save();
    }

    res.json({
      id: endpoints[0].id,
      remote: `http://nebu:lis@${process.env['GIT_HOST']}/${endpoints[0].id}.git`});
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

  //TODO: pick the latest file in the repo, not the first occurence in the db.
  //TODO: add error handling to rimraf
  download: (req, res) => {
    const store = '/tmp';
    Team.find(req.param('id')).populate('members').exec((err, team) => {
      Member.find(team[0].members[0].id).populate('endpoints').exec((err, members) => {
        console.log(members);
        if (members[0].endpoints.length > 0) {
          const eid = members[0].endpoints[0].id;
          const path = `${process.env['REPO_LOCATION']}/${eid}.git`;
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
    });
  }


};
