const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');

module.exports = class extends Generator {
  /**
   * Init web generator with base generator
   */
  initializing() {
    this.composeWith(require.resolve('../base'), {stack: 'node'});
  }

  /**
   * Write project structure
   */
  writing() {
    writeTpl.call(this);
  }
};
