const keystone = require('keystone');
const restify = require('express-restify-mongoose');
let router = keystone.createRouter();

/**
 * Set default restify settings
 */
const RESTIFY_DEFAULTS = {
  prefix: '',
  private: [
    'updatedBy',
    'createdBy',
    '__v',
    '_keywords'
  ],
  access: (req) => {
    if (req.user && req.user.isAdmin) return 'private';
    if (req.user) return 'protected';
    return 'public';
  }
};
restify.defaults(RESTIFY_DEFAULTS);

/**
 * API
 */
router.use(keystone.middleware.api);
require('./User')(router, restify, RESTIFY_DEFAULTS);

/**
 * Render Angular templates
 */
router.get('/ng/:path.html',
  (req, res) => new keystone.View(req, res).render(`ng/${req.params.path}`));

/**
 * Custom error handler
 */
keystone.set('500', (err, req, res, next) => {
  let msg = err.message;

  switch (msg) {
    case 'not_allowed':
    case 'not_auth':
    case 'method_forbidden':
      return res.apiNotAllowed(msg);
      break;

    case 'not_found':
      return res.apiNotFound();
      break;
  }

  return res.apiError(msg);
});

module.exports = router;
