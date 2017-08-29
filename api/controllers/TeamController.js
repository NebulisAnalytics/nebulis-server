/**
 * TeamController
 *
 * @description :: Server-side logic for managing teams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

//TODO: create test for this
  create: async (req, res) => {
    try {
      team = await Team.create({
        name: 'unnamed group',
        project: req.body.project
      });
      await team.members.add(req.body.members);
      await team.save();
      res.send(team);
    } catch (err) {
      sails.log(err);
      res.send(err);
    }
  },
  index: (req, res) => {
    sails.log('create team');
    sails.log(req.body);
    res.send('success');
  },
  projectIndex: (req, res) => {
    sails.log('view teams for project');

    Team.find({project: req.params.id}).populate('members').exec((err, teams) => {
      Project.find({id: req.params.id}).exec((err, project) => {
        const result = {
          teams: teams,
          project: project[0]
        }
        res.send(result);
      });
    });
  },
  view: (req, res) => {
    sails.log('create team');
    sails.log(req.body);
    res.send('success');
  }
};
