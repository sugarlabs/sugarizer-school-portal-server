// Load Sugarizer Settings
var fs = require('fs'),
	ini = require('ini');

// Load and parse config.ini
exports.load = function() {
	//add directory
	var confFile = './env/config.ini';

	//check file
	try {
		fs.statSync(confFile);
	} catch (err) {
		console.log("Ooops! cannot load settings file '"+ confFile + "', error code "+err.code);
		process.exit(-1);
	}

	//parse config
	var settings = ini.parse(fs.readFileSync(confFile, 'utf-8'));

	return settings;
};
