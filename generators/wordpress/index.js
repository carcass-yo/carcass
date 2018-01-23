const CarcassGenerator = require('../../lib/carcass-generator');
const _ = require('lodash');
const chalk = require('chalk');
const crypto = require('crypto');

module.exports = class extends CarcassGenerator {
  /**
   * Bitrix generator
   * @param {String|Array} args
   * @param {Object} opts
   */
  constructor(args, opts) {
    super(args, opts);
    this.option('showGreeting', {
      type: Boolean,
      description: 'Stack greeting',
      default: true,
      hide: true
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
  }

  /**
   * Init web generator with base generator
   */
  initializing() {
    this.composeWith(require.resolve('../base'), {stack: 'wordpress'});
    this.options.authKey = crypto.randomBytes(64).toString('hex');
    this.options.secureAuthKey = crypto.randomBytes(64).toString('hex');
    this.options.loggedInKey = crypto.randomBytes(64).toString('hex');
    this.options.nonceKey = crypto.randomBytes(64).toString('hex');
    this.options.authSalt = crypto.randomBytes(64).toString('hex');
    this.options.secureAuthSalt = crypto.randomBytes(64).toString('hex');
    this.options.loggedInSalt = crypto.randomBytes(64).toString('hex');
    this.options.nonceSalt = crypto.randomBytes(64).toString('hex');
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
