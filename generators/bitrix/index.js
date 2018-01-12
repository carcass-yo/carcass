const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');

module.exports = class extends Generator {
  /**
   * Init web generator with base generator
   */
  initializing() {
    this.composeWith(require.resolve('../base'), {stack: 'bitrix'});
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
        name: 'devDatabasePassword',
        message: 'Enter development database password',
        default: '123456'
      },
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
