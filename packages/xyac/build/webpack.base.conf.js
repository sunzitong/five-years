const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeEmptyAssetsPlugin = require('html-webpack-exclude-empty-assets-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 从js中抽出css
const config = require('../config');
const utils = require('./utils');

const production = process.env.NODE_ENV === 'production';
const development = process.env.NODE_ENV === 'development';
const resolve = dir => path.join(__dirname, '..', dir);

const getHtmlTpl = (files, prefixs = '') => {
  const htmls = utils.getFileMap(files, prefixs);
  return Object.entries(htmls).map(item => {
    const [name, p] = item;
    let chunks = ['vendors', 'lib', name.replace(prefixs, '')];
    // 公共js lib
    if (p.indexOf('/components/') > -1) {
      chunks = chunks.filter(item => !['lib'].includes(item));
    }
    return new HtmlWebpackPlugin({
      filename: `./${name}.html`,
      template: p,
      chunks, // 选择要打包js 入口文件
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      chunksSortMode: 'manual', // 顺序插入js
      inject: true,
    });
  });
};

const htmlTpl = production
  ? getHtmlTpl('./src/pages/**/*.ejs')
  : getHtmlTpl('./src/**/*.ejs', '.views');

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay,
  },
});

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    ...utils.getFileMap('./src/components/**/*.js'),
    ...utils.getFileMap('./src/pages/**/*.js'),
    lib: './src/lib.js',
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: production ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
  },
  resolve: {
    extensions: ['.js', '.ejs', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
      ...(config.dev.useEslint && development ? [createLintingRule()] : []),
      {
        test: /\.ejs$/,
        use: ['underscore-template-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      ...utils.styleLoaders({
        sourceMap: config.dev.productionSourceMap,
        extract: true,
        usePostCSS: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // chunkFilename: '[id].css',
    }),
    ...htmlTpl,
    new HtmlWebpackExcludeEmptyAssetsPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks(chunk) {
            return !['styles', 'lib'].includes(chunk.name);
          },
        },
        styles: {
          name: 'vendors',
          test: /\.(le|c|sa)ss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
