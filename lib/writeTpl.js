module.exports = function writing(options = {
  templatePath: '.',
  destinationPath: '.',
  globOptions: {}
}) {
  options = Object.assign({
    templatePath: '.',
    destinationPath: '.',
    globOptions: {}
  }, options);

  this.fs.copyTpl(
    this.templatePath(options.templatePath),
    this.destinationPath(options.destinationPath),
    this.options,
    {},
    {
      globOptions: Object.assign({
        dot: true
      }, options.globOptions)
    }
  );
};
