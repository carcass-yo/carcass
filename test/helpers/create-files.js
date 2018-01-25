module.exports = {
  base: [
    '.editorconfig',
    '.eslintrc',
    '.htmllintrc',
    '.stylelintrc',
    '.dockerignore',
    '.gitignore',
    '.gitlab-ci.yml',
    'Makefile',
    'package.json',
    'readme.md'
  ],
  frontend: [
    'tslint.json',
    '#DIR#/favicon.png',
    '#DIR#/karma.webpack.conf.js',
    '#DIR#/package.json',
    '#DIR#/tsconfig.json',
    '#DIR#/webpack.config.js',
    '#DIR#/config/bs.proxy.js',
    '#DIR#/config/helpers.js',
    '#DIR#/config/karma.conf.js',
    '#DIR#/config/karma-test-shim.js',
    '#DIR#/config/webpack.common.js',
    '#DIR#/config/webpack.dev.js',
    '#DIR#/config/webpack.prod.js',
    '#DIR#/config/webpack.test.js',
    '#DIR#/src/app/lib/helpers.ts',
    '#DIR#/src/app/lib/jquery.ts',
    '#DIR#/src/app/lib/RestService.ts',
    '#DIR#/src/app/lib/uikit.ts',
    '#DIR#/src/styles/blocks/.gitkeep',
    '#DIR#/src/styles/base.less',
    '#DIR#/src/styles/style.less',
    '#DIR#/src/styles/uikit.less',
    '#DIR#/src/styles/variables.less',
    '#DIR#/src/main.ts',
    '#DIR#/src/polyfills.ts',
    '#DIR#/src/vendor.ts'
  ],
  web: [
    'www/index.php',
    'docker-compose.override.yml',
    'docker-compose.prod.yml',
    'docker-compose.yml',
    'Dockerfile',
    'Dockerfile-prod',
    'sbin/custom-entrypoint'
  ],
  bitrix: [
    'www/bitrix/.settings.php',
    'www/migrations/.gitkeep',
    'www/bitrixsetup.php',
    'www/composer.json',
    'custom-xdebug.ini',
    'docker-compose.override.yml',
    'docker-compose.prod.yml',
    'docker-compose.yml',
    'Dockerfile',
    'Dockerfile-prod',
    'sbin/custom-entrypoint'
  ],
  node: [
    'nginx/conf.d/default.conf',
    'nginx/Dockerfile',
    'sbin/custom-entrypoint',
    'www/lib/middleware.js',
    'www/lib/nav.js',
    'www/lib/wasNew.js',
    'www/logs/.gitkeep',
    'www/models/AppConfig.js',
    'www/models/index.js',
    'www/models/Mail.js',
    'www/models/Page.js',
    'www/models/ResetPasswordRequest.js',
    'www/models/User.js',
    'www/public/uploads/.gitkeep',
    'www/routes/api/index.js',
    'www/routes/api/User.js',
    'www/routes/index.js',
    'www/templates/emails/enquiry-default.pug',
    'www/templates/layouts/default.pug',
    'www/templates/layouts/email.pug',
    'www/templates/mixins/flash-messages.pug',
    'www/templates/views/ng/.gitkeep',
    'www/templates/views/index.pug',
    'www/updates/0.0.1-admins.js',
    'www/updates/0.0.2-app-config.js',
    'www/.eslintrc',
    'www/ecosystem.config.js',
    'www/index.js',
    'www/package.json',
    '.pug-lintrc',
    'docker-compose.override.yml',
    'Dockerfile-prod',
    'Dockerfile',
    'docker-compose.yml',
    'docker-compose.prod.yml'
  ],
  wordpress: [
    'www/app/config/environments/development.php',
    'www/app/config/environments/production.php',
    'www/app/config/environments/staging.php',
    'www/app/config/application.php',
    'www/app/config/memcached.php',
    'www/app/mu-plugins/disallow-indexing.php',
    'www/app/mu-plugins/register-theme-directory.php',
    'www/app/plugins/.gitkeep',
    'www/app/themes/.gitkeep',
    'www/app/uploads/.gitkeep',
    'www/wp/.gitkeep',
    'www/composer.json',
    'www/index.php',
    'www/wp-cli.yml',
    'www/wp-config.php',
    'custom-xdebug.ini',
    'docker-compose.override.yml',
    'docker-compose.prod.yml',
    'docker-compose.yml',
    'Dockerfile',
    'Dockerfile-prod'
  ]
};
