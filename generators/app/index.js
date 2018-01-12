const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  // constructor(args, opts) {
  //   super(args, opts);
  //
  //   console.log(this.options);
  //
  //   process.exit(1);
  // }

  /**
   * Prompts user for project info
   *
   * @return {Promise}
   */
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the best ' + chalk.red('generator-carcass') + ' generator!'
    ));

    const prompts = [
      {
        type: 'list',
        name: 'stack',
        message: 'Choose your project stack',
        choices: [
          {
            name: 'Simple PHP-FPM + NGINX',
            value: 'web'
          },
          {
            name: 'Bitrix',
            value: 'bitrix'
          },
          {
            name: 'WordPress',
            value: 'wordpress'
          },
          {
            name: 'Node.js',
            value: 'node'
          }
        ]
      },

      // Web stack options
      {
        type: 'confirm',
        name: 'includeMysql',
        message: 'Would you like to include MySQL?',
        default: true,
        when: (answers) => answers.stack === 'web'
      },

      // Bitrix stack options
      {
        type: 'input',
        name: 'templateName',
        message: 'Enter your template name',
        default: this.appname,
        when: (answers) => answers.stack === 'bitrix'
      },

      {
        type: 'input',
        name: 'devDomain',
        message: 'Enter development domain name',
        default: this.appname + '.dev'
      },

      {
        type: 'input',
        name: 'devDatabasePassword',
        message: 'Enter development database password',
        default: '123456',
        when: (answers) => answers.stack === 'bitrix' || answers.includeMysql
      }
    ];

    return this.prompt(prompts).then((props) => Object.assign(this, props, {
      authorName: this.user.git.name(),
      authorEmail: this.user.git.email()
    }));
  }

  /**
   * Write project structure
   */
  writing() {
    this._writeBase();
    this._writeStack();
  }

  /**
   * Write base project configs
   * @private
   */
  _writeBase() {
    this.fs.copyTpl(
      this.templatePath('base'),
      this.destinationPath('.'),
      this,
      {},
      {
        globOptions: {
          dot: true
        }
      }
    );
  }

  /**
   * Write stack files
   * @private
   */
  _writeStack() {
    this.fs.copyTpl(
      this.templatePath(this.stack),
      this.destinationPath('.'),
      this
    );
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

  /**
   * Run installDependencies in directory
   * @param {String[]|String} dir
   * @param {Object} options
   * @return {Promise}
   * @private
   */
  _installInDir(dir, options) {
    if (!Array.isArray(dir)) dir = [dir];
    dir = path.resolve(...dir);
    let cwd = process.cwd();
    process.chdir(dir);
    return this.installDependencies(options).then(() => process.chdir(cwd));
  }
};
