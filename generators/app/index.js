const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
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
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.props = props;
    });
  }

  /**
   * Write project structure
   */
  writing() {
    this._writeDotFiles();
  }

  /**
   * Write project configs
   * @private
   */
  _writeDotFiles() {
    let dotFiles = [
      {
        filename: 'editorconfig',
        type: 'simple'
      },
      {
        filename: 'eslintrc',
        type: 'simple'
      },
      {
        filename: 'htmllintrc',
        type: 'simple'
      },
      {
        filename: 'stylelintrc',
        type: 'simple'
      },
      {
        filename: 'gitignore',
        type: 'template',
        options: this.props
      },
      {
        filename: 'dockerignore',
        type: 'template',
        options: this.props
      },
      {
        filename: 'gitlab-ci.yml',
        type: 'template',
        options: this.props
      },
      {
        filename: '_package.json',
        outputFilename: 'package.json',
        type: 'template',
        options: Object.assign({
          appname: this.appname,
          authorName: this.user.git.name(),
          authorEmail: this.user.git.email()
        }, this.props)
      }
    ];

    if (this.props.stack === 'node')
      dotFiles.push({
        filename: 'pug-lintrc',
        type: 'simple'
      });

    dotFiles.forEach((file) => {
      if (!file.outputFilename)
        file.outputFilename = '.' + file.filename;

      switch (file.type) {
        case 'template':
          this.fs.copyTpl(
            this.templatePath(file.filename),
            this.destinationPath(file.outputFilename),
            file.options
          );
          break;

        case 'simple':
        default:
          this.fs.copy(
            this.templatePath(file.filename),
            this.destinationPath(file.outputFilename)
          );
          break;
      }
    });
  }

  /**
   * Install scripts
   */
  install() {
    this.yarnInstall();
  }
};
