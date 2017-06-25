/* eslint indent: ["error", 2] */

const gulp = require('gulp');
const del = require('del');

const conf = require('../conf/gulp.conf');

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

gulp.task('clean', clean);
