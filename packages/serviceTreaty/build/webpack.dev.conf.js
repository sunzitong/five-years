const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// 'webpack-hot-middleware/client?noInfo=true&reload=true'
const deventry = Object.keys(baseWebpackConfig.entry).reduce((prev, curr) => {
  const newPrev = prev;
  newPrev[curr] = [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    baseWebpackConfig.entry[curr],
  ];
  return newPrev;
}, {});

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  entry: deventry,
  devtool: config.dev.devtool,
  plugins: [
    ...baseWebpackConfig.plugins,
    new webpack.DefinePlugin({
      PUBLIC_PATH: JSON.stringify(config.dev.assetsPublicPath),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*'],
      },
    ]),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          `Your application is running here: ${config.dev.https ? 'https' : 'http'}://${
            config.dev.host
          }:${config.dev.port}`,
        ],
      },
      onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
      clearConsole: true,
    }),
  ],
});

module.exports = devWebpackConfig;
