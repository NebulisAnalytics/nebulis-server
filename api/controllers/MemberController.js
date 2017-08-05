/**
 * MemberController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getMembers: function (req, res) {
		Member.find({}).exec(function (err, members) {
			if (err) {
				res.status(500);
				res.send(err);
			}
			else res.send(members);
		});
	}

};
