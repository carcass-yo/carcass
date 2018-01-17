const Generator = require('yeoman-generator');
const installer = require('./installer');

/**
 * Custom Yeoman Generator class with additional features
 */
class GoldenCodeYoGenerator extends Generator {
  /**
   * Init class
   * @param {String|Array} args
   * @param {Object} opts
   */
  constructor(args, opts) {
    super(args, opts);
    this.installer = installer;
  }

  /**
   * Write template files
   * @param {Object} options
   * @protected
   */
  writeTpl(options) {
    options = Object.assign({
      templatePath: '.',
      destinationPath: '.',
      globOptions: {}
    }, options);

    this.fs.copyTpl(
      this.templatePath(options.templatePath),
      this.destinationPath(options.destinationPath),
      this.options,
      {},
      {
        globOptions: Object.assign({dot: true}, options.globOptions)
      }
    );
  }
}

module.exports = GoldenCodeYoGenerator;
