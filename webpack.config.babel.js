import $ from "jquery";
import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';

const client = {
  entry: {
    js: './src/javascripts/index.js',
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'src', 'javascripts'),
        use: { loader: 'babel-loader' }
      }
    ]
  },
  resolve: {
    extensions: [
      '.jsx',
      '.js'
    ],
    modules: [
      "node_modules"
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};

const server = {
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [ nodeExternals({ modulesFromFile: true }) ],
  entry: ["babel-polyfill", "./server/server.js"],
  output: {
    path: path.join(__dirname, './server'),
    filename: 'server-es5.js'
  },
  module: {
    rules: [
      {
        test: path.join(__dirname, 'server'),
        use: { loader: 'babel-loader' }
      }
    ]
  }
};

export default [client, server];
