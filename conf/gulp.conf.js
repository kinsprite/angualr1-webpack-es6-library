/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const path = require('path');
const gutil = require('gulp-util');

exports.ngModule = 'app';

const webpackEnv = {
  dev: { name: 'development', conf: './webpack-dev.conf.js' },
  dist: { name: 'production', conf: './webpack-dist.conf.js' },
  test: { name: 'test', conf: './webpack-test.conf.js' },
};

exports.webpackEnv = webpackEnv;

exports.buildWebpackConf = function buildWebpackConf(env) {
  return require(env.conf)(env); // eslint-disable-line import/no-dynamic-require
};

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e',
  tasks: 'gulp_tasks',
};

/**
* used on gulp dist
*/

exports.path = {};

Object.keys(exports.paths).forEach((pathName) => {
  if (Object.prototype.hasOwnProperty.call(exports.paths, pathName)) {
    exports.path[pathName] = function pathJoin(...arg) {
      const pathValue = exports.paths[pathName];
      const funcArgs = Array.prototype.slice.call(arg);
      const joinArgs = [pathValue].concat(funcArgs);
      return path.join.apply(this, joinArgs);
    };
  }
});

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};
