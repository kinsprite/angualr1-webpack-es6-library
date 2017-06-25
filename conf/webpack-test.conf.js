/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack-base.conf');
const copyConfig = require('./webpack-copy.conf');

module.exports = function webpackTestConf(env) {
  return webpackMerge(baseConfig(env), copyConfig(env), {
    plugins: [
      new webpack.NamedModulesPlugin(),
    ],
    devtool: 'source-map',
    output: {
      // path: path.join(process.cwd(), conf.paths.tmp),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    performance: {
      hints: false,
      maxEntrypointSize: 3200000,
      maxAssetSize: 500000,
    },
  });
};
