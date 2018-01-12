const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const describe = require('mocha').describe;
const before = require('mocha').before;
const it = require('mocha').it;
const createFiles = require('./helpers/create-files');
const unique = require('./helpers/array-unique');

describe('generator-carcass:app:node', () => {
  before(function() {
    this.timeout(10000);
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({generator: 'node'})
      .toPromise();
  });

  it('creates files', () => {
    assert.file(unique([].concat(createFiles.base, createFiles.node)));
  });
});
