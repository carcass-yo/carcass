/**
 * Group models to categories by implication and set admin app navigation
 */

const keystone = require('keystone');

let modelsMap = {
  'AppConfig': 'system',
  'Mail': 'enquiries',
  'User': 'users',
  'Company': 'users',
  'PartnerRequest': 'users',
  'ResetPasswordRequest': 'users',
  'Category': 'marketplace',
  'Soft': 'marketplace',
  'SoftImages': 'marketplace',
  'Review': 'marketplace',
  'Order': 'marketplace',
  'MenuLink': 'cms',
  'Action': 'cms',
  'Page': 'cms'
};

let nav = {};

let lists = Object.keys(keystone.lists);
lists.forEach((key) => {
  let section = modelsMap[key];
  if (!section) return;

  if (!nav[section]) nav[section] = [];
  nav[section].push(key);
});

keystone.set('nav', nav);
