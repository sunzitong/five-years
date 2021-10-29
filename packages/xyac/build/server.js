const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxy = require('http-proxy-middleware');
const config = require('./webpack.dev.conf');

const app = express();
const devconfig = require('../config/index').dev;

const compiler = webpack(config);
const HOST = process.env.HOST || devconfig.host;
const PORT = (process.env.PORT && Number(process.env.PORT)) || devconfig.port;
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
});

app.use('/assets', express.static('src/assets'));
app.use('/static', express.static('src/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data) => {
    hotMiddleware.publish({
      action: 'reload',
    });
  });
});
app.use(hotMiddleware);
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    logLevel: 'error',
    // writeToDisk: true,
  })
);

/** 代理转化 */
Object.entries(devconfig.proxyTable).forEach(item => {
  const [k, v] = item;
  app.use(k, proxy(v));
});

app.get('/', async (request, response) => {
  const res = await compiler.outputFileSystem.readdirSync(compiler.outputPath);
  const items = res
    .map(item => ({
      base: item,
      type: 'file',
      title: item,
      ext: 'html',
      relative: path.join('/', item),
    }))
    .filter(item => /.html$/.test(item.base));
  response.render('index', { title: compiler.outputPath, items });
  response.end();
});

// Serve the files on port 3000.
app.listen(PORT, async () => {
  console.log(`Example app listening on port ${HOST}:${PORT}!\n`);
});
