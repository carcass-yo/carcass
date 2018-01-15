const keystone = require('keystone');
const User = keystone.list('User');
const ResetPasswordRequest = keystone.list('ResetPasswordRequest');
const _ = require('underscore');
const ObjectId = require('mongoose').Types.ObjectId;

// set query populate options for nested paths
const DEFAULT_POPULATE_OPTIONS = [];

module.exports = (router, restify, defaults) => {
  /**
   * Sign in
   */
  router.post('/v1/User/signin', (req, res, next) => {
    // Find user
    User.model.findOne({
      $or: [
        {username: req.body.username},
        {email: req.body.username}
      ]
    }).exec()
      // Check password
      .then((user) => {
        return new Promise((resolve, reject) => {
          if (!user)
            return reject(new Error('Неверные имя пользователя или пароль'));

          user._.password.compare(req.body.password, (err, result) => {
            if (err) return reject(err);
            if (!result)
              return reject(new Error('Неверные имя пользователя или пароль'));
            resolve(user);
          });
        });
      })
      // start session
      .then((user) => {
        return new Promise((resolve) => {
          keystone.session.signinWithUser(
            user,
            req,
            res,
            (user) => resolve(user)
          );
        });
      })
      .then((user) => user.populate(DEFAULT_POPULATE_OPTIONS).execPopulate())
      .then((user) => user.normalize())
      .then((plain) => res.apiResponse(plain))
      .catch(next);
  });

  /**
   * Sign out
   */
  router.all('/v1/User/signout',
    (req, res) => keystone.session.signout(req, res, (err) => {
      if (err) return res.apiError('signout error', err);
      res.apiResponse(null);
    }));

  /**
   * Reset password
   */
  router.post('/v1/User/resetPasswordRequest', (req, res, next) => {
    User.model.findOne({
      $or: [
        {username: req.body.username},
        {email: req.body.username}
      ]
    }).exec()
      .then((user) => {
        if (!user) throw new Error('Пользователь не найден');
        let rpr = new ResetPasswordRequest.model({user});
        return rpr.save();
      })
      .then(() => res.apiResponse({
        result: 'Ok',
        message: 'Запрос на смену пароля успешно создан. Мы отправили Вам на почту письмо с инструкцией по смене пароля.' // eslint-disable-line max-len
      }))
      .catch(next);
  });

  router.post('/v1/User/resetPassword', (req, res, next) => {
    let resetPasswordRequest;
    let user;
    ResetPasswordRequest.model
      .findOne({_id: new ObjectId(req.body._id)})
      .populate('user')
      .exec()
      // update password
      .then((rpr) => {
        if (!rpr) throw new Error('Запрос на смену пароля устарел');
        resetPasswordRequest = rpr;
        user = rpr.user;
        user.password = req.body.password;
        return user.save();
      })
      // remove password reset request
      .then(() => resetPasswordRequest.remove())
      // start session
      .then(() => {
        return new Promise((resolve) => {
          keystone.session.signinWithUser(
            user,
            req,
            res,
            (user) => resolve(user)
          );
        });
      })
      .then((user) => user.populate(DEFAULT_POPULATE_OPTIONS).execPopulate())
      .then((user) => user.normalize())
      .then((plain) => res.apiResponse(plain))
      .catch(next);
  });

  let postMiddleware = (req, res, next) => {
    if (Array.isArray(req.erm.result))
      req.erm.result = req.erm.result.map((i) => i.normalize());
    else
      req.erm.result = req.erm.result.normalize();

    if (req.firstOnly && Array.isArray(req.erm.result))
      req.erm.result = req.erm.result[0];

    next();
  };

  restify.serve(router, User.model, {
    lean: false,
    private: ['isAdmin'].concat(defaults.private),
    findOneAndUpdate: true,
    preMiddleware: (req, res, next) => {
      // use GET route for current user
      if (req.route.path === '/v1/User' && req.method.toLowerCase() === 'get') {
        if (!req.user) return next(new Error('not_auth'));
        req.context = {_id: req.user._id};
        req.firstOnly = true;
      }

      if (_.isEmpty(req._ermQueryOptions.populate))
        req._ermQueryOptions.populate = DEFAULT_POPULATE_OPTIONS;

      next();
    },
    // disable DELETE method
    preDelete: (req, res, next) => next(new Error('method_forbidden')),
    contextFilter: (model, req, done) => {
      if (req.context) return done(model.find(req.context));
      done(model);
    },
    postRead: postMiddleware,
    postCreate: (req, res, next) => {
      // start session after user created
      keystone.session.signinWithUser(req.erm.result, req, res,
        () => postMiddleware(req, res, next));
    },
    postUpdate: postMiddleware
  });
};
