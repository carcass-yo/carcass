const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-carcass:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({stack: 'web'});
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
