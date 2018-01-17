const CarcassGenerator = require('../../lib/carcass-generator');
const _ = require('lodash');
const chalk = require('chalk');

module.exports = class extends CarcassGenerator {
  /**
   * Base generator
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
        this.destinationPath(),
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
