const keystone = require('keystone');
const bunyan = require('bunyan');
const path = require('path');
const _ = require('underscore');

/** Initialise Keystone with project's configuration */
keystone.init({
  'name': '<%=appname%>',
  'brand': '<%=appnameSlug%>',
  'port': process.env.PORT || 3000,
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/<%=appnameSlug%>',
  'static': 'public',
  'favicon': 'public/favicon.png',
  'views': 'templates/views',
  'view engine': 'pug',
  'emails': 'templates/emails',
  'session': true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  'default region': 'ru',
  'wysiwyg additional buttons': [
    'restoredraft',
    'emoticons'
  ].join(),
  'wysiwyg additional plugins': [
    'autosave',
    'emoticons'
  ].join(),
  'auto update': true
});

/** Set locals for pug templates */
keystone.set('locals', {
  _: _,
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
});

/** Create bunyan loggers */
let logsDir = path.resolve(__dirname, 'logs');
let createLog = (logName) => {
  return bunyan.createLogger({
    name: logName,
    streams: [
      {
        level: 'info',
        path: `${logsDir}/${logName}.log`
      }
    ]
  });
};
let logs = {};
[
  'mail'
].forEach((logName) => logs[logName] = createLog(logName));
keystone.set('logs', logs);

/** Upload storage for local file storing */
keystone.set('uploadStorage', new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: path.resolve(__dirname, 'public/uploads'),
    publicPath: '/uploads/'
  }
}));

/** Load models and keystone admin navigation */
require('./models');
require('./lib/nav');

/** Middleware */
const MW = require('./lib/middleware');
keystone.set('middleware', MW);
keystone.pre('routes', MW.corsMiddleware);
keystone.pre('static', MW.corsMiddleware);

/** Router */
keystone.set('routes', require('./routes'));
keystone.set('signin redirect', (user, req, res) =>
  res.redirect((user.isAdmin) ? '/keystone' : '/'));

/** Start keystone app */
keystone.start();
