const CarcassGenerator = require('../../lib/carcass-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const fs = require('fs');

module.exports = class extends CarcassGenerator {
  /**
   * Init main generator
   * Get available generators list
   * @return {Promise}
   */
  initializing() {
    return new Promise((resolve, reject) => {
      let generatorsDir = path.resolve(this.templatePath(), '..', '..');
      fs.readdir(generatorsDir, (err, files) => {
        if (err) return reject(err);

        let ignoredGenerators = ['app', 'base', 'frontend'];
        this.availableGenerators = files
          .filter((file) =>
            !(file.startsWith('.') || ignoredGenerators.includes(file))
          )
          .map((stack) => {
            return {
              name: stack,
              value: stack
            };
          });

        resolve();
      });
    });
  }

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
        name: 'generator',
        message: 'Choose your project stack',
        choices: this.availableGenerators
      }
    ];

    return this.prompt(prompts).then((props) => {
      this.composeWith(require.resolve('../' + props.generator));
    });
  }

  /**
   * Install dependencies
   */
  install() {
    if (this.options.skipInstall) return;
    this.installer.run().then(() => console.log('success'));
  }
};
