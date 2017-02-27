let {banner, entry, preLoaders, loaders, target} = require('./webpack.config.js');
const webpack = require('webpack');
const WriteJsonPlugin = require('write-json-webpack-plugin');
const packageProperties = require('./package.json');

const releasePackageJson = {
  name: packageProperties.name,
  version: packageProperties.version,
  main: 'bitmovin-javascript.js'
};

module.exports = {
  entry,
  target,
  output: {
    path: './build/release',
    filename: packageProperties.name + '.js',
    libraryTarget: 'umd',
    library: 'Bitmovin'
  },
  module: {
    preLoaders,
    loaders
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.BannerPlugin(banner),
    new WriteJsonPlugin({
      object: releasePackageJson,
      path: './build/release',
      filename: 'package.json'
    })
  ]
}

