'use strict'

var through2 = require('through2');
var gutil = require('gulp-util');
var Moji = require('moji');

var PLUGIN_NAME = 'gulp-han2zen';

module.exports = function (opts) {
  return through2.obj( function (file, enc, cb) {

    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    var options = opts || {};
    var contents = file.contents.toString();
    var result = Moji(contents).convert('HK', 'ZK').toString();

    if (result !== false) {
      file.contents = new Buffer(result);
    }

    this.push(file);
    cb();

  });
};