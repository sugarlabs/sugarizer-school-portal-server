// include libraries
var superagent = require('superagent'),
	common = require('../../../helper/common'),
	regexValidate = require('../../../helper/regexValidate');

module.exports = function postLogin(req, res) {
	// validate
	req.assert('user', 'UsernameInvalid').notEmpty();
	req.assert('password', 'PasswordBlank').notEmpty();

	// get errors
	var errors = req.validationErrors();

	var identifier = req.body.user;

	var query = {
		password: req.body.password
	};

	if (regexValidate('email').test(identifier)) {
		query['email'] = identifier;
	} else {
		query['username'] = identifier;
	}

	//form data
	var form = {
		user: JSON.stringify(query)
	};

	//call
	if (!errors) {
		// call
		superagent
			.post(common.getAPIUrl(req) + 'auth/login')
			.set({
				"content-type": "application/json",
			})
			.send(form)
			.end(function (error, response) {
				if (response.statusCode == 200) {
					//store user and key in session
					req.session.user = response.body;
	
					// redirect to dashboard
					return res.redirect('/');
				} else {
					req.flash('errors', {
						msg: 'ErrorCode'+response.body.code
					});
					return res.redirect('/login');
				}
			});
	} else {
		req.flash('errors', errors);
		return res.redirect('/login');
	}
};
