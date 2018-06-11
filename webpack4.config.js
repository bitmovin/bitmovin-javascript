const path = require('path');

const clone = require('lodash/cloneDeep');

const isProd = process.env.NODE_ENV === 'production';

console.log(isProd);

const baseFileName = 'bitmovin';

const baseBundleConfig = {
  mode: isProd ? 'production' : 'development',
  context: path.join(__dirname, 'bitmovin'),
  entry: ['./index.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'bitmovin'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/,
      query: {
        configFileName: 'tsconfig.es5.json'
      }
    }]
  },
  optimization: {
    noEmitOnErrors: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: isProd ? false : 'source-map',
  stats: process.env.WEBPACK_MODE === 'log' ? 'verbose' : 'normal'
};

// Browsers
const browserBundle = clone(baseBundleConfig);
browserBundle.output.filename = `${baseFileName}.browser${isProd ? '.min' : ''}.js`;

// Node
const nodeBundle = clone(baseBundleConfig);
nodeBundle.output.filename = `${baseFileName}.node${isProd ? '.min' : ''}.js`;
delete nodeBundle.node;

module.exports = [browserBundle, nodeBundle];
