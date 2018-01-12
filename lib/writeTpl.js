module.exports = function writing() {
  this.fs.copyTpl(
    this.templatePath('.'),
    this.destinationPath('.'),
    this.options,
    {},
    {
      globOptions: {
        dot: true
      }
    }
  );
};
