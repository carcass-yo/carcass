const GoldenCodeYoGenerator = require('../../lib/gc-yo-gen');
const _ = require('lodash');
const chalk = require('chalk');

module.exports = class extends GoldenCodeYoGenerator {
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
    this._install();
  }

  /**
   * Install scripts
   * @private
   */
  _install() {
    this.installer.add(
      this.installer.installInDir(
        this.destinationPath('www'),
        (done) => {
          this.spawnCommand('composer', ['install'])
            .on('error', (err) => {
              console.error(err);
              done();
            })
            .on('exit', () => done());
        },
        _.template(
          'Run ' +
          chalk.yellow.bold('composer install') +
          ' in <%=dir%>'
        )
      )
    );
  }
};
