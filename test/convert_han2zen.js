'use strict';

var assert = require('assert');
var gutil = require('gulp-util');
var han2zen = require('../index');

describe('gulp-han2zen', function () {

  it('should replace half-width string to full-width string', function (done) {

    var stream = han2zen();

    stream.on('data', function (file) {
      var expect = 'ハンカク';
      assert.equal(file.contents.toString(), expect);
      done();
    });

    stream.write(new gutil.File({
      contents: new Buffer('ﾊﾝｶｸ')
    }));

    stream.end();
  });

});