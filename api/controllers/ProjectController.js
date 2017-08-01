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
  }

	// getProject: function (req, res) {
	// 	Project.find(project.id).exec(function (err, project){
	// 		if (err){
	// 			res.status(500);
	// 			res.send(err);
	// 		}
	// 		else res.send(project);
	// 	});
	// }

};
