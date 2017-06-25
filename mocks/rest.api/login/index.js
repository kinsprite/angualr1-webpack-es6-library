// https://github.com/imrefazekas/connect-rest#rest-functions
//
/* eslint-disable prefer-template, no-console */

const fs = require('fs');

function loginGetService(request, content, callback) {
    console.log('Received headers:' + JSON.stringify(request.headers));
    // console.log('Received queries:' + JSON.stringify(request.query)); // query
    console.log('Received parameters :' + JSON.stringify(request.parameters));
    console.log('Received JSON object:' + JSON.stringify(content)); // body
    const userId = request.parameters.user !== undefined ? request.parameters.user : -1;
    return callback(null, fs.createReadStream(`./mocks/rest.api/login/login.${userId}.GET.json`, { encoding: 'utf-8' }));
}

function loginPutService(request, content, callback) {
    console.log('Received headers:' + JSON.stringify(request.headers));
    // console.log('Received queries:' + JSON.stringify(request.query)); // query
    console.log('Received parameters :' + JSON.stringify(request.parameters));
    console.log('Received JSON object:' + JSON.stringify(content)); // body
    const userId = content.userId !== undefined ? content.userId : -1;
    return callback(null, fs.createReadStream(`./mocks/rest.api/login/login.${userId}.PUT.json`, { encoding: 'utf-8' }));
}

function loginApi(rest) {
    rest.get('/login', loginGetService, { contentType: 'application/json;charset=utf-8' });
    rest.put('/login', loginPutService, { contentType: 'application/json;charset=utf-8' });
}

module.exports = loginApi;
