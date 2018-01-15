module.exports = function writing(options = {
  templatePath: '.',
  destinationPath: '.',
  globOptions: {}
}) {
  this.fs.copyTpl(
    this.templatePath(options.templatePath),
    this.destinationPath(options.destinationPath),
    this.options,
    {},
    {
      globOptions: Object.assign({
        dot: true,
        ignore: ['no-glob-*/**']
      }, options.globOptions)
    }
  );
};
