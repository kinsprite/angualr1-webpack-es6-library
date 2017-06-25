/**
 * Created by qxqs1 on 2017/4/7.
 */

/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const conf = require('./gulp.conf');

module.exports = function webpackCopyConf(env) {
  function isProduction() {
    return (env.name === conf.webpackEnv.dist.name);
  }

  return {
    plugins: [
      // new CopyWebpackPlugin([
      //   {
      //     // Leaflet 图标js加载不可添加 HASH
      //     from: 'node_modules/leaflet/dist/images/',
      //     to: 'images/leaflet/',
      //   },
      //   {
      //     // copy GLOBs. 相对路径: context
      //     context: conf.path.src('assets/'),
      //     from: '**/*.woff',
      //     to: 'assets/',
      //     ignore: [],
      //   },
      //   {
      //     // copy DIR. 相对路径: DIR/
      //     from: conf.path.src('assets/images/'),
      //     to: 'assets/images/',
      //   },
      //   {
      //     // copy file. 相对路径: DIR/
      //     from: conf.path.src('assets/media/postcss-assets.svg'),
      //     to: 'assets/media/',
      //   },
      // ], {
      //   ignore: [],
      //   debug: false,
      // }),
    ],
  };
};
