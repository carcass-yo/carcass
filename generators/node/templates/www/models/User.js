const keystone = require('keystone');
const Types = keystone.Field.Types;
const uploadStorage = keystone.get('uploadStorage');
const _ = require('underscore');

/**
 * User Model
 * ==========
 */
let User = new keystone.List('User', {track: true});

User.add({
  username: {
    type: Types.Text,
    initial: true,
    required: true,
    index: true
  },
  name: {
    label: 'Имя',
    type: Types.Name,
    initial: true,
    required: true,
    index: true
  },
  email: {
    label: 'E-mail',
    type: Types.Email,
    initial: true,
    required: true,
    index: true
  },
  password: {
    label: 'Пароль',
    type: Types.Password,
    initial: true,
    required: true
  },
  isAdmin: {
    type: Boolean,
    label: 'Администратор',
    index: true,
    note: 'Глобальный администраторский доступ'
  }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

/**
 * Process User model object into plain object for API
 * @return {User}
 */
User.schema.methods.normalize = function() {
  const FIELDS = [
    '_id',
    'username',
    'name',
    'email',
    'isAdmin',
  ];

  let copy = JSON.parse(JSON.stringify(this));
  copy = _.pick(copy, ...FIELDS);
  copy.photo = this._.email.gravatarUrl(220, 'mm');
  return copy;
};

// Define relations
// User.relationship({ref: 'Review', path: 'reviews', refPath: 'user'});
// User.relationship({ref: 'Order', path: 'orders', refPath: 'user'});

User.defaultColumns = [
  'name',
  'username',
  'email',
  'isAdmin',
].join(',');
User.register();
