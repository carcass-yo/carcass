const helpers = require('./helpers');
const pub = helpers.root('public');
module.exports = {
  files: [
    `${helpers.BUILD_PATH}/**`,
    `${pub}/html/**`,
    `${pub}/img/**`,
    `${pub}/fonts/**`
  ],
  proxy: {
    target: 'http://<%=devDomain%>/',
    ws: true
  }
};
