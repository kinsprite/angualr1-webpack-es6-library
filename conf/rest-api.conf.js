/* eslint indent: ["error", 2] */

const Rest = require('connect-rest');

const options = {
  context: '/rest',
  logger: {
    file: './.tmp/rest-api.log',
    level: 'debug',
  },
};

const rest = Rest.create(options);

module.exports = rest;
