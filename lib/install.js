const _ = require('lodash');
const async = require('async');
const path = require('path');
const chalk = require('chalk');

/**
 * Install singleton class
 */
class Install {
  /**
   * Init install class
   * @return {Install}
   */
  constructor() {
    if (this.instance) return this.instance;
    this.scripts = [];
    this.instance = this;
  }

  /**
   * Add new script
   * @param {Function} script
   */
  add(script) {
    this.scripts.push(script);
  }

  /**
   * Run install script in custom directory
   * @param {String[]|String} dir Directory where to run install script
   * @param {Function} script Install function(done)
   * @param {Function|String} [message] message text before running the script
   * @return {Function}
   */
  installInDir(dir, script, message) {
    if (!Array.isArray(dir)) dir = [dir];
    dir = path.resolve(...dir);
    let cwd = process.cwd();

    if (!message) message = _.template('Run install script in: <%=dir%>');
    if (typeof message === 'function') message = message({
      dir: chalk.blue(dir)
    });

    return (cb) => {
      console.log(message);
      process.chdir(dir);
      script(() => {
        process.chdir(cwd);
        cb();
      });
    };
  }

  /**
   * Run install scripts
   * @return {Promise}
   */
  run() {
    return new Promise((resolve, reject) => {
      async.series(this.scripts, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = new Install();
