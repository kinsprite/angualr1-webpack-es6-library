/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path');
const os = require('os');

const WebpackChunkHash = require('webpack-chunk-hash');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const UglifyJsParallelPlugin = require('webpack-uglify-parallel');

const conf = require('./gulp.conf');
const baseConfig = require('./webpack-base.conf');
const copyConfig = require('./webpack-copy.conf');

module.exports = function webpackDistConf(env) {
  return webpackMerge(baseConfig(env), copyConfig(env), {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(conf.webpackEnv.dist.name),
      }),
      new UglifyJsParallelPlugin({
        // usually having as many workers as cpu cores gives good results
        workers: os.cpus().length,
        // other uglify options
        sourceMap: true,
        compress: { unused: true, dead_code: true, warnings: false }, // eslint-disable-line camelcase
        comments: false, // remove all comments
      }),
      // new webpack.HashedModuleIdsPlugin(),
      // new WebpackChunkHash(),
      // new InlineManifestWebpackPlugin({
      //   name: 'webpackManifest',
      // }),
    ],
    devtool: 'source-map', // 'cheap-module-source-map' 会造成 js map 文件失效
    output: {
      path: path.join(process.cwd(), conf.paths.dist),
      filename: '[name].min.js',
      chunkFilename: '[name].min.js',
      library: 'angular1WebpackEs6Library',
      libraryTarget: 'umd',
    },
    performance: {
      hints: 'error',
      maxEntrypointSize: 3200000,
      maxAssetSize: 250000,
    },
    // 定义从外部 CDN 加载模块
    // externals: {
    //   jquery: 'jQuery'
    // }
  });
};
