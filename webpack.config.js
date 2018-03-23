const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'client');
const APP_DIR = path.resolve(__dirname, 'client/components');

const common = {
  resolve: { extensions: ['.jsx', '.js'] },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

const client = {
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
};

const server = {
  entry: `${APP_DIR}/server-index.jsx`,
  target: 'node',
  output: {
    path: BUILD_DIR,
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs-module',
  },
};

// const config = {
//   resolve: { extensions: ['.jsx', '.js'] },
//   entry: APP_DIR + '/client/components/index.jsx',
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js',
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?/,
//         include: APP_DIR,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };

// module.exports = config;

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];
