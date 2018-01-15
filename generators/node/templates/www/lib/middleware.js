/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

/**
 * Prevents people from accessing protected pages when they're not signed in
 * @param {object} req (request object)
 * @param {object} res (response object)
 * @param {function} next (callback function)
 * @return {*} skip middleware
 */
let requireUser = (req, res, next) => {
  if (req.user) return next();

  req.flash('error', 'Please sign in to access this page.');
  res.redirect('/keystone/signin');
};


/**
 * Prevents anybody, who not admin, from accessing protected pages
 * @param {object} req (request object)
 * @param {object} res (response object)
 * @param {function} next (callback function)
 * @return {*} redirect on home if no user or user is not admin
 */
let requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    req.flash('error', 'Please sign in to access this page.');
    return res.redirect('/');
  }

  next();
};

let corsMiddleware = require('cors')({
  origin: /(localhost|<%=devDomain%>)/,
  methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  credentials: true
});

module.exports = {
  requireUser,
  requireAdmin,
  corsMiddleware
};
