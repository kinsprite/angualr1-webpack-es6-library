/* eslint indent: ["error", 2] */

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const browsersync = require('browser-sync');

const gulpConf = require('../conf/gulp.conf');

function webpackWrapper(watch, conf, done) {
  let doneRun = done;
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false,
    }));
    if (doneRun) {
      doneRun();
      doneRun = null;
    } else {
      browsersync.reload();
    }
  };

  if (watch) {
    webpackBundler.watch({
      aggregateTimeout: 500,
      ignored: /node_modules/,
      poll: 1000,
    }, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}

gulp.task('webpack:dev', (done) => {
  webpackWrapper(false, gulpConf.buildWebpackConf(gulpConf.webpackEnv.dev), done);
});

gulp.task('webpack:watch', (done) => {
  webpackWrapper(true, gulpConf.buildWebpackConf(gulpConf.webpackEnv.dev), done);
});

gulp.task('webpack:dist', (done) => {
  process.env.NODE_ENV = gulpConf.webpackEnv.dist.name;
  webpackWrapper(false, gulpConf.buildWebpackConf(gulpConf.webpackEnv.dist), done);
});
