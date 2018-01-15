const path = require('path');

/**
 * Run installDependencies in directory
 * @param {String[]|String} dir Directory where to run install script
 * @param {Object|Function} options Install options or install function(done)
 * @return {Promise}
 */
function installInDir(dir, options) {
  if (!Array.isArray(dir)) dir = [dir];
  dir = path.resolve(...dir);
  let cwd = process.cwd();
  process.chdir(dir);

  let script;
  if (typeof options === 'function')
    script = new Promise((resolve) => options(resolve));
  else
    script = this.installDependencies(options);

  return script.then(() => process.chdir(cwd));
}

module.exports = installInDir;
