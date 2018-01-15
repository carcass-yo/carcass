const keystone = require('keystone');
let router = keystone.createRouter();

// Render Angular app for all public pages
router.get('/*', (req, res) => {
  let view = new keystone.View(req, res);
  view.query('config', keystone.list('AppConfig').model.findOne());
  return view.render('index');
});

module.exports = (app) => {
  app.use('/api', require('./api'));
  app.use(router);
};
