/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const assign = require('object-assign');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestJsonWebpackPlugin = require('./inline-manifest-json.webpack.plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

// const pkg = require('../package.json');
const stylelintOptions = require('./stylelint-options.conf');
const cssLoaders = require('./css-loaders.conf');

const urlLoaderLimit = 2000; // 内嵌 font/svg/png 大小限制

module.exports = function webpackBaseConf(env) {
  function isProduction() {
    return (env.name === conf.webpackEnv.dist.name);
  }

  function isTest() {
    return (env.name === conf.webpackEnv.test.name);
  }

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, /src.libs?/],
          use: [
            /** eslint 或 jshint, 二选一 */
            'eslint-loader',
            // 'jshint-loader',
          ],
          enforce: 'pre',
        },
        {
          test: /\.html?$/,
          exclude: [/node_modules/, /src.libs?/],
          use: [
            'htmlhint-loader',
          ],
          enforce: 'pre',
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
        {
          //  普通图像
          test: /\.(jpe?g|png|gif)$/,
          exclude: [/\.tmp.\.sprites/, /node_modules.leaflet/],
          use: [{
            loader: 'file-loader',
            options: {
              // use HASH file name for 'production
              name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              // publicPath: 'images/',
            },
          }],
        },
        {
          // Sprites 图像
          test: /\.tmp.\.sprites.+\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              // use HASH file name for 'production
              name: isProduction() ? 'sprite-[hash].[ext]' : '[path][name].[ext]',
              outputPath: 'images/',
              // publicPath: 'images/',
            },
          }],
        },
        {
          //  Leaflet图标，需特殊处理，其使用js替换css class中的url().
          test: /node_modules.leaflet.+\.(jpe?g|png|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', // Leaflet 图标js加载不可添加 HASH
              outputPath: 'images/leaflet/',
              // publicPath: 'images/leaflet/',
            },
          }],
        },
        {
          // 字体
          test: /\.(woff|woff2|eot|ttf)$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            // publicPath: 'fonts/',
          },
        },
        {
          // 普通图像 SVG
          test: /\.svg$/,
          exclude: /(glyphicons|\.tmp.\.sprites).*\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            // publicPath: 'images/',
          },
        },
        {
          // Sprites SVG
          test: /\.tmp.\.sprites.+\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? 'sprite-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'images/',
            // publicPath: 'images/',
          },
        },
        {
          // 字体 SVG
          test: /glyphicons.*\.svg$/,
          loader: 'url-loader',
          options: {
            limit: urlLoaderLimit,
            // use HASH file name for 'production
            name: isProduction() ? '[name]-[hash].[ext]' : '[path][name].[ext]',
            outputPath: 'fonts/',
            // publicPath: 'fonts/',
          },
        },
        {
          test: /\.p?css$/,
          exclude: /mock-api-n-css-module/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoaders.pcss(isProduction(), false),
          }),
        },
        {
          test: /mock-api-n-css-module.+\.p?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoaders.pcss(isProduction(), true),
          }),
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'ng-annotate-loader',
            'babel-loader',
          ],
        },
        {
          test: /\.html$/,
          use: [
            'html-loader',
          ],
        },
        {
          test: /\.modernizrrc.js$/,
          use: [
            'modernizr-loader',
          ],
        },
      ],
    },
    plugins: (function (isTestArg) {
      const plugins = [
        new webpack.NoEmitOnErrorsPlugin(),
        // new HtmlWebpackPlugin({
        //   minify: isProduction()
        //     ? { collapseBooleanAttributes: true, collapseWhitespace: true, removeComments: true }
        //     : false,
        //   template: conf.path.src('index.ejs'),
        // }),
        new ExtractTextPlugin({
          // CSS chunk 不可以导出到 output.path 的其它位置, 否则, 找不到 css url() 中的图片位置
          filename: isProduction() ? '[name].min.css' : '[name].css',
          // filename: '[name].css',
          disable: false,
        }),
        // new ChunkManifestPlugin({
        //   filename: 'chunk-manifest.json',
        //   manifestVariable: 'webpackManifest',
        // }),
        // new InlineManifestJsonWebpackPlugin({
        //   filename: 'chunk-manifest.json',
        //   manifestJsonVariable: 'webpackManifestJson',
        // }),
        new DuplicatePackageCheckerPlugin(),
        new webpack.LoaderOptionsPlugin({
          debug: !isProduction(),
        }),
        new StylelintWebpackPlugin(
          assign({
            files: ['**/*.?(p|s)css'],
          }, stylelintOptions.scss)),
        new webpack.ProvidePlugin({
          // ***
          // *** Webpack碰到全局变量 $ 时, 查找到指定的模块 'jquery'
          // ***
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery', // for Angular 1.x
        }),
      ];

      // Test 时，不可使用 CommonsChunkPlugin, 否则找不到 webpackJsonp
      // if (!isTestArg) {
      //   plugins.push(
      //     new webpack.optimize.CommonsChunkPlugin({
      //       // 必需 reverse() 才能确 HTML template 中加载 script 次序正确
      //       name: [
      //         // 公共 chunk ，不应添加 app entries
      //         'manifest', 'babel-polyfill', 'vendor-base', 'vendor-angular', 'vendor-ui-router', 'vendor-ng-ui',
      //         'vendor-leaflet', 'vendor-d3',
      //       ].reverse(),
      //       // js chunk 可以导出到 output.path 的其它位置, 但造成 require.ensure 加载时找不到文件。
      //       filename: isProduction() ? '[name]-[chunkhash].js' : '[name].js',
      //       minChunks: Infinity,
      //     }));
      // }

      return plugins;
    }(isTest())),
    resolve: {
      alias: {
        // ***
        // *** Webpack 查找模块/文件时，使用 alias 去替换文件路径.
        // ***
        jquery: 'jquery/dist/jquery.js',
        // 'bootstrap': 'bootstrap/dist/js/bootstrap.js',
        'bootstrap.css': 'bootstrap/dist/css/bootstrap.css', // 点号(.)相对于 gulp 执行目录
        'leaflet.css': 'leaflet/dist/leaflet.css',
        modernizr$: path.resolve(__dirname, '.modernizrrc.js'),
      },
      extensions: ['.js'],
    },
    entry: {
      // ***
      // *** 在目标 HTML 中以几个模块加载(js/css)
      // ***
      'angualr1-webpack-es6-library': [`./${conf.path.src('index.pcss')}`, `./${conf.path.src('index')}`],
      // 'babel-polyfill': ['babel-polyfill'],
      // 'vendor': Object.keys(pkg.dependencies),
      // 'vendor-base': ['jquery', 'bootstrap', 'bootstrap.css', 'animate.css'],
      // 'vendor-angular': ['angular', 'angular-animate', 'angular-sanitize'],
      // 'vendor-ui-router': ['angular-ui-router'],
      // 'vendor-ng-ui': ['angular-translate', 'angular-ui-bootstrap'],
      // 'vendor-leaflet': ['leaflet', 'leaflet.css'],
      // 'vendor-d3': ['d3'],
    },
    externals: {
      // 'babel-polyfill': 'babel-polyfill',
      angular: 'angular',
      d3: 'd3',
      'angular-animate': {
        commonjs: 'angular-animate',
        commonjs2: 'angular-animate',
        amd: 'angular-animate',
      },
      'angular-sanitize': {
        commonjs: 'angular-sanitize',
        commonjs2: 'angular-sanitize',
        amd: 'angular-sanitize',
      },
      'angular-ui-router': {
        commonjs: 'angular-ui-router',
        commonjs2: 'angular-ui-router',
        amd: 'angular-ui-router',
      },
      'angular-translate': {
        commonjs: 'angular-translate',
        commonjs2: 'angular-translate',
        amd: 'angular-translate',
      },
      'angular-ui-bootstrap': {
        commonjs: 'angular-ui-bootstrap',
        commonjs2: 'angular-ui-bootstrap',
        amd: 'angular-ui-bootstrap',
      },
      bootstrap: {
        commonjs: 'bootstrap',
        commonjs2: 'bootstrap',
        amd: 'bootstrap',
      },
      jquery: {
        commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: 'jQuery',
      },
      leaflet: {
        commonjs: 'leaflet',
        commonjs2: 'leaflet',
        amd: 'leaflet',
        root: 'L',
      },
    },
  };
};
