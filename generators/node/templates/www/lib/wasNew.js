module.exports = function(next) {
  this.wasNew = this.isNew;
  next();
};
