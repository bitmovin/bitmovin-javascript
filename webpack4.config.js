const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const baseFileName = 'bitmovin';

const config = {
  mode: isProd ? 'production' : 'development',
  context: path.join(__dirname, 'bitmovin'),
  entry: ['./index.ts'],
  output: {
    filename: `${baseFileName}.browser${isProd ? '.min' : ''}.js`,
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'bitmovin'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      exclude: /node_modules/
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

module.exports = config;
