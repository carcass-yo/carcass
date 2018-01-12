const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('showGreeting', {
      type: Boolean,
      description: 'Stack greeting',
      default: true,
      hide: true
    });
    this.option('stack', {
      type: String,
      description: 'Stack name',
      required: true
    });
    this.option('authorName', {
      type: String,
      description: 'Author full name',
      default: this.user.git.name()
    });
    this.option('authorEmail', {
      type: String,
      description: 'Author full name',
      default: this.user.git.email()
    });
    this.option('appname', {
      type: String,
      description: 'appname',
      default: this.appname,
      hide: true
    });
  }

  /**
   * Write project structure
   */
  writing() {
    writeTpl.call(this);
  }

  /**
   * Install scripts
   */
  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
