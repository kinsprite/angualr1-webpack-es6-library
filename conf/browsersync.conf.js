/* eslint indent: ["error", 2] */

const bodyParser = require('body-parser');

const conf = require('./gulp.conf');
const mockApi = require('./mock-api.conf');
const rest = require('./rest-api.conf');
require('../mocks/rest.api/');

function endFinished(req, res, next) {
  if (!res.finished) {
    next();
  }
}

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src,
      ],
    },
    open: false,
    middleware: [
      bodyParser.urlencoded({ extended: true }),
      bodyParser.json(),
      rest.processRequest(),
      mockApi,
      endFinished],
  };
};
