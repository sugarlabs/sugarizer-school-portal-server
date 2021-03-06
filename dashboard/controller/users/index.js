// include libraries
var superagent = require('superagent'),
	moment = require('moment'),
	common = require('../../../helper/common'),
	addUser = require('./addUser'),
	editUser = require('./editUser'),
	deleteUser = require('./deleteUser'),
	viewUser = require('./viewUser'),
	profile = require('./profile');

// init settings
var ini = null;
exports.init = function(settings) {
	ini = settings;
};

exports.ini = function() {
	return ini;
};

// main landing page
exports.index = function(req, res) {

	//query
	var query = {
		sort: '+name'
	};

	//get query params
	if (req.query.name != '') {
		query['q'] = req.query.name;
	}
	if (req.query.role != '') {
		query['role'] = req.query.role;
	}
	if (req.query.limit != '') {
		query['limit'] = req.query.limit;
	}
	if (req.query.offset != '') {
		query['offset'] = req.query.offset;
	}
	if(req.query.sort !=''){
		query['sort'] = req.query.sort;
	}

	// call
	superagent
		.get(common.getAPIUrl(req) + 'api/v1/users')
		.set(common.getHeaders(req))
		.query(query)
		.end(function (error, response) {
			if (response.statusCode == 200) {
				console.log("Users: ", response.body);
				res.render('users', {
					module: 'users',
					moment: moment,
					query: query,
					data: response.body,
					headers: common.getHeaders(req),
					account: req.session.user,
					server: ini.information
				});
			} else {
				req.flash('errors', {
					msg: 'ErrorCode'+response.body.code
				});
			}
		});
};

exports.addUser = addUser;

exports.editUser = editUser;

exports.deleteUser = deleteUser;

exports.viewUser = viewUser;

exports.profile = profile;
