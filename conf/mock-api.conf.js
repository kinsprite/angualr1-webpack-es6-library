/* eslint indent: ["error", 2] */

// https://github.com/Saturate/mock-api-middleware

const mam = require('mock-api-middleware');

// You could put this directly in the middleware array of browser-sync
const mockApi = mam('/rest',   // Route where to mount the API
  {
    mockPath: './mocks/rest.mocks/', // Where to find the API files
  });

module.exports = mockApi;
