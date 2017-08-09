/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getProjects: function (req, res) {
    Project.find({}).exec(function (err, projects) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      else res.send(projects);
    });
  },
  
  create: async (req, res) => {
    try {
      const name = req.body.name;
      const gitLink = req.body.gitLink;
      const slug = gitLink.split('/')[4];
      const project = await Project.create({ name, slug, gitLink });
      res.send(project);
    } catch (err) {
      res.send(err);
    }
  }

};
