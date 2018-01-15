const Generator = require('yeoman-generator');
const writeTpl = require('../../lib/writeTpl');
const installInDir = require('../../lib/installInDir');

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
    writeTpl.call(this);
    writeTpl.call(this, {
      templatePath: 'no-glob-templates',
      destinationPath: this.options.dir,
      globOptions: {
        ignore: []
      }
    });

    if (this.options.includeAngular)
      writeTpl.call(this, {
        templatePath: 'no-glob-angular',
        destinationPath: this.options.dir,
        globOptions: {
          ignore: []
        }
      });
  }

  /**
   * Install dependencies
   */
  install() {
    installInDir.call(this, this.options.dir, {
      npm: false,
      bower: false,
      yarn: true
    });
  }
};
