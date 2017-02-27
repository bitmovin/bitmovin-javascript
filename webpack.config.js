const packageProperties = require('./package.json');

const banner =
        '\n' +
        'Copyright (C) ' + new Date().getFullYear() + ', Bitmovin, Inc., All Rights Reserved\n' +
        '\n' +
        'This source code and its use and distribution, is subject to the terms\n' +
        'and conditions of the applicable license agreement.\n' +
        '\n' +
        packageProperties.name + ' version ' + packageProperties.version + '\n';

const entry = './bitmovin/bitmovin.js';

const preLoaders = [];

const loaders = [
  {
    test: /\.json$/,
    loader: 'json-loader'
  },{
    test   : /\.js$/,
    exclude: /node_modules/,
    loader : 'babel-loader'
}];

const target = 'node';

module.exports = {
  banner,
  entry,
  target,
  preLoaders,
  loaders
};
