/**
 * Created by qxqs1 on 2017/2/14.
 */

/* eslint indent: ["error", 2] */
/* eslint global-require:"off" */

const sourceMappingURL = require('source-map-url');
const assign = require('object-assign');

function InlineManifestJsonPlugin(options) {
  this.options = assign({
    filename: 'chunk-manifest.json',
    manifestJsonVariable: 'webpackManifestJson',
  }, options);
}

InlineManifestJsonPlugin.prototype.apply = function pluginApply(compiler) {
  const self = this;

  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
      const filename = self.options.filename;

      const webpackManifestJson = [];
      const htmlPlugnAssets = htmlPluginData.assets;
      const compilationAssets = compilation.assets;

      const manifest = compilationAssets[filename];

      if (manifest) {
        webpackManifestJson.push(sourceMappingURL.removeFrom(manifest.source()));
        delete compilationAssets[filename];
      }

      htmlPlugnAssets[self.options.manifestJsonVariable] = webpackManifestJson.join(',') || '{}';
      callback(null, htmlPluginData);
    });
  });
};

module.exports = InlineManifestJsonPlugin;
