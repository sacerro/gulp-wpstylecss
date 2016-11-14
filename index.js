var fs = require('fs');
var Readable = require('stream').Readable;
var gutil = require('gulp-util');
var _ = require('lodash'); 

var pkg = JSON.parse(fs.readFileSync('package.json', {encoding: 'utf8'}));

module.exports = function (options) {
	'use strict';

	options = _.defaults(options || {}, {
	path: 'style.css',
	themename: pkg.config.themename,
	themeURI: pkg.config.themeURI,
	description: pkg.config.description,
	author: pkg.config.author,
	authorURI: pkg.config.authorURI,
	version: pkg.config.version,
	license: pkg.config.license,
	licenseURI: pkg.config.licenseURI,
	tags: pkg.config.tags,
	textdomain: pkg.config.textdomain
	});

	if (!options.path) {
		throw new gutil.PluginError('gulp-wpstylecss', '`path` is required!');
	}

	if (!options.themename) {
		throw new gutil.PluginError('gulp-wpstylecss', '`themename` is required!');
	}
	if (!options.author) {
		throw new gutil.PluginError('gulp-wpstylecss', '`author` is required!');
	}


	/*
	Theme Name:     <%= options.name %>
	Theme URI:      <%= options.themeURI %>
	Author:         <%= options.author %>
	Author URI:     <%= options.authorURI %>
	Description:    <%= options.description %>
	Version:        <%= options.version %>
	License:        <%= options.license %>
	License URI:    <%= options.licenseURI %>
	Tags:           <%= options.tags %>
	Text Domain:    <%= options.textdomain %>
	*/
	
	var contents = '/*\n';

	contents += 'Theme Name:     ' + options.themename + '\n';
	
	if (options.themeURI) {
		contents += 'Theme URI:      ' + options.themeURI + '\n';
	}
	
	contents += 'Author:         ' + options.author + '\n';
	
	if (options.authorURI) {
		contents += 'Author URI:     ' + options.authorURI + '\n';
	}
	
	if (options.description) {
		contents += 'Description:    ' + options.description + '\n';
	}
	
	if (options.version) {
		contents += 'Version:        ' + options.version + '\n';
	} else {
		contents += 'Version:        ' + '1.0' + '\n';
	}
	
	if (options.license) {
		contents += 'License:        ' + options.license + '\n';
	}
	
	if (options.licenseURI) {
		contents += 'License URI:    ' + options.licenseURI + '\n';
	}
	
	if (options.tags) {
		contents += 'Tags:           ' + options.tags.join(", ") + '\n';
	}
	
	if (options.textdomain) {
		contents += 'Text Domain:    ' + options.textdomain + '\n';
	}
	
	contents += '*/';

	var stream = new Readable({objectMode: true});
	stream._read = function noop() {}; 
	stream.push(new gutil.File({
		path: options.path,
		contents: new Buffer(contents, , 'utf8')
	}));
	stream.push(null);
	return stream;
};
