const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const pkJson = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/nextWork.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'nextWork.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
        include: [path.resolve(__dirname, './node_modules./node-fetch')],
        exclude: /node_modules/,
      },
    ],
  },
};
