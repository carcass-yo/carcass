module.exports = {
  base: [
    '.editorconfig',
    '.eslintrc',
    '.htmllintrc',
    '.stylelintrc',
    '.dockerignore',
    '.gitignore',
    '.gitlab-ci.yml',
    'package.json'
  ],
  web: [
    'www/index.php',
    'docker-compose.override.yml',
    'docker-compose.prod.yml',
    'docker-compose.yml',
    'Dockerfile',
    'Dockerfile-prod',
    'entrypoint.sh'
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
    'entrypoint.sh'
  ],
  node: [
    '.pug-lintrc'
  ]
};
