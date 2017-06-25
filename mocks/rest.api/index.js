/**
 * 导入 rest 处理的其它文件:
 *
 * require('./xxx')(rest);
 * require('./yyy')(rest);
 * require('./zzz')(rest);
 *
 * https://github.com/imrefazekas/connect-rest
 */

const rest = require('../../conf/rest-api.conf');

require('./login/')(rest);
require('./books/')(rest);
