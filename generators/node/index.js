const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');
const crypto = require('crypto');

module.exports = class extends Generator {
  /**
   * Init web generator with base generator
   */
  initializing() {
    this.composeWith(require.resolve('../base'), {stack: 'node'});
    this.options.cookieSecret = crypto.randomBytes(64).toString('hex');
  }

  /**
   * Prompts user for project info
   *
   * @return {Promise}
   */
  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'devDomain',
        message: 'Enter development domain name',
        default: this.appname + '.dev'
      }
    ];

    return this.prompt(prompts).then((props) => Object.assign(
      this.options,
      props,
      {appname: this.appname}
    ));
  }

  /**
   * Write project structure
   */
  writing() {
    writeTpl.call(this);
  }
};
