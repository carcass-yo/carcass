const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');
const installer = require('../../lib/install');
const _ = require('lodash');
const chalk = require('chalk');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('dir', {
      type: String,
      description: 'Install directory',
      required: true
    });
    this.option('devDomain', {
      type: String,
      description: 'Development domain name',
      required: true
    });
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
        name: 'includeAngular',
        message: 'Would you like to include Angular?',
        default: false
      },
      {
        type: 'confirm',
        name: 'includeUIkit',
        message: 'Would you like to include UIkit?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeJQuery',
        message: 'Would you like to include jQuery?',
        default: true,
        when: (answers) => !answers.includeUIkit
      }
    ];

    return this.prompt(prompts).then((props) => {
      Object.assign(
        this.options,
        props,
        {appname: this.appname}
      );
      if (this.options.includeUIkit) this.options.includeJQuery = true;
    });
  }

  /**
   * Write project structure
   */
  writing() {
    writeTpl.call(this, {templatePath: 'root'});
    writeTpl.call(this, {
      templatePath: 'main',
      destinationPath: this.options.dir
    });

    if (this.options.includeAngular)
      writeTpl.call(this, {
        templatePath: 'angular',
        destinationPath: this.options.dir
      });

    this._install();
  }

  /**
   * Install dependencies
   * @private
   */
  _install() {
    installer.add(
      installer.installInDir(
        this.destinationPath(this.options.dir),
        (done) => {
          this.spawnCommand('yarn', ['install'])
            .on('error', (err) => {
              console.error(err);
              done();
            })
            .on('exit', () => done());
        },
        _.template(
          'Run ' +
          chalk.yellow.bold('yarn install') +
          ' in <%=dir%>'
        )
      )
    );
  }
};
