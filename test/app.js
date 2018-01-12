const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const describe = require('mocha').describe;
const before = require('mocha').before;
const it = require('mocha').it;

describe('generator-carcass:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({stack: 'web'})
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      '.editorconfig',
      '.eslintrc',
      '.htmllintrc',
      '.stylelintrc',
      // '.pug-lintrc',
      '.dockerignore',
      '.gitignore',
      '.gitlab-ci.yml',
      'package.json'
    ]);
  });
});
