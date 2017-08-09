/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: (req, res) => {
    sails.log('create team');
    sails.log(req.body);
    res.send('success');
  },
  index: (req, res) => {
    sails.log('create team');
    sails.log(req.body);
    res.send('success');
  },
  projectIndex: (req, res) => {
    sails.log('view teams for project');

    Team.find({project: req.params['id']}).populate('members').exec((err, teams) => { res.send(teams)});
  },
  view: (req, res) => {
    sails.log('create team');
    sails.log(req.body);
    res.send('success');
  }
};

