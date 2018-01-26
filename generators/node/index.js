const CarcassGenerator = require('../../lib/carcass-generator');
const crypto = require('crypto');

module.exports = class extends CarcassGenerator {
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
        default: this.appnameSlug + '.dev'
      }
    ];

    return this.prompt(prompts).then((props) => {
      Object.assign(
        this.options,
        props,
        {
          appname: this.appname,
          appnameSlug: this.appnameSlug
        }
      );
      this.composeWith(require.resolve('../frontend'), {
        dir: 'www/public',
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
