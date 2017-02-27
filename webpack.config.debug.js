let {banner, entry, preLoaders, loaders, target} = require('./webpack.config.js');
const webpack = require('webpack');
const packageProperties = require('./package.json');

module.exports = {
  entry,
  target,
  output: {
    path: './build/debug',
    filename: packageProperties.name + '.js',
    libraryTarget: 'umd',
    library: 'Bitmovin'
  },
  module: {
    preLoaders,
    loaders
  },
  plugins: [
    new webpack.BannerPlugin(banner)
  ]
};
