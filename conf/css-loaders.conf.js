/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const path = require('path');
const conf = require('./gulp.conf');

const assetsLoadPaths = ['assets/images/', 'assets/'];
let spriteCount = 0;

// postcss-sprite 被调用多次，需使用不同的文件名
function makeSpritesheetPath(opts, spritesheet) {
  const groups = spritesheet.groups;
  const extension = spritesheet.extension;
  const prefix = `sprite-${spriteCount}`;
  spriteCount += 1;

  return path.join(opts.spritePath, [prefix].concat(groups, [extension]).join('.'));
}

function getPostcssPlugins(usePreCSS, useAssets, useSprites, spriteDir) {
  const plugins = [];

  if (usePreCSS) {
    plugins.push(
      require('postcss-import'),
      require('lost'),
      require('precss')({
        import: {
          disable: true,
        },
      }),
      require('postcss-math')({ functionName: 'mathcalc' }), // 必需给函数名，否则与 assets 的 resolve() 冲突
      require('postcss-utilities'));
  }

  if (useAssets) {
    plugins.push(
      require('postcss-assets')({
        basePath: conf.path.src(),
        loadPaths: assetsLoadPaths,
        relative: true, // 使用相对路径，让 sprites 查找到文件
      }));
  }

  // *** sprites ***
  if (useSprites) {
    plugins.push(
      require('postcss-sprites')({
        spritePath: `./${conf.path.tmp(spriteDir)}`,
        relativeTo: 'file', // 使用相对路径，让 file-loader 查找到文件
        hooks: {
          onSaveSpritesheet: makeSpritesheetPath,
        },
      }));
  }

  plugins.push(
    require('postcss-strip-inline-comments'),
    require('postcss-flexbugs-fixes'),
    require('postcss-cssnext'),
    require('doiuse'),
    require('postcss-browser-reporter'),
    require('postcss-reporter'));

  return plugins;
}

module.exports = {
  pcss: (isProduction, modules = false) => [
    {
      loader: 'css-loader',
      options: {
        localIdentName: '[local]-[hash:base64:10]',
        modules,
        minimize: isProduction,
        sourceMap: true,
        importLoaders: 1, // 该 loader 执行时的前面有几个。 loaders 执行的次序为 right to left
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => getPostcssPlugins(true, true, isProduction && false, '.sprites/'), // *** Disable sprites ***
        syntax: 'postcss-scss', // SCSS-like syntax
        sourceMap: true,
      },
    },
  ],
};
