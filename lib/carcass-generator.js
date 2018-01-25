const Generator = require('yeoman-generator');
const installer = require('./installer');
const shell = require('shelljs');

/**
 * Custom Yeoman Generator class with additional features
 */
class CarcassGenerator extends Generator {
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

  /**
   * Get git repository origin url
   * @param {string} [defaultValue] set default returned value
   * @return {string}
   */
  getGitOrigin(defaultValue = '') {
    if (!shell.which('git')) return defaultValue;
    let res = shell
      .exec('git remote get-url origin', {silent: true})
      .stdout
      .trim();
    return res.includes('Not a git repository') ? defaultValue : res;
  }
}

module.exports = CarcassGenerator;
