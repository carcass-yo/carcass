'use strict';
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
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  /**
   * Write project structure
   */
  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  /**
   * Install scripts
   */
  install() {
    this.installDependencies();
  }
};
