const GoldenCodeYoGenerator = require('../../lib/gc-yo-gen');

module.exports = class extends GoldenCodeYoGenerator {
  /**
   * Init web generator with base generator
   */
  initializing() {
    this.composeWith(require.resolve('../base'), {stack: 'web'});
  }

  /**
   * Prompts user for project info
   *
   * @return {Promise}
   */
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'includeMysql',
        message: 'Would you like to include MySQL?',
        default: true
      },
      {
        type: 'input',
        name: 'devDatabasePassword',
        message: 'Enter development database password',
        default: '123456',
        when: (answers) => answers.includeMysql
      },
      {
        type: 'input',
        name: 'devDomain',
        message: 'Enter development domain name',
        default: this.appname + '.dev'
      }
    ];

    return this.prompt(prompts).then((props) => {
      Object.assign(
        this.options,
        props,
        {appname: this.appname}
      );
      this.composeWith(require.resolve('../frontend'), {
        dir: 'www',
        devDomain: this.options.devDomain
      });
    });
  }

  /**
   * Write project structure
   */
  writing() {
    this.writeTpl.call(this);
  }
};
