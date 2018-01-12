const Generator = require('yeoman-generator');

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
    this.fs.copyTpl(
      this.templatePath('.'),
      this.destinationPath('.'),
      this.options,
      {},
      {
        globOptions: {
          dot: true
        }
      }
    );
  }
};
