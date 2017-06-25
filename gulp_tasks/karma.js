/* eslint indent: ["error", 2] */

process.env.NODE_ENV = 'test';

const path = require('path');
const gulp = require('gulp');
const karma = require('karma');


function karmaFinishHandler(done) {
  return (errorCode) => {
    const error = errorCode ? new Error(`Test failed, error code ${errorCode}.`) : undefined;
    done(error);
  };
}

function karmaSingleRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma.conf.js');
  const karmaServer = new karma.Server({
    configFile,
    singleRun: true,
    autoWatch: false,
  }, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaAutoRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma.conf.js');
  const karmaServer = new karma.Server({
    configFile,
    singleRun: false,
    autoWatch: true,
  }, karmaFinishHandler(done));
  karmaServer.start();
}

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);
