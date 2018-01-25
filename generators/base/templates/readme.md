# <%=appname%>

Описание проекта (одно предложение).

## Начало работы

Эти инструкции помогут тебе получить копию проекта на локальную машину для разработки и/или тестирования. Смотри, как развернуть проект в живой системе, в разделе "Деплой".

### Необходимые условия окружения

Для запуска проекта в системе должны быть установлены:

- Docker
- Node.js
- [Docker Proxy](http://git.zolotoykod.ru/zk/docker-proxy-letsencrypt)

### Установка

Клонируем репозиторий, собираем фронтэнд и запускаем приложение

```bash
git clone <%=gitOrigin%> && cd <%=dirname%>
yarn install
make frontend
npm run start
```

## Запуск тестов

Объясните, как запускать автоматические тесты для этой системы, что тестируют эти тесты и почему

```bash
make test
```

### Проверка стиля кода

Линтеры проверяют код на соответствие [стилю кода](http://git.zolotoykod.ru/zk/developer-guide/blob/master/1-standards/readme.md).
Запуск линтеров производится автоматически перед коммитом или командой:

```bash
npm run lint
```

## Деплой

Для проекта настроен автоматический деплой средствами Gitlab CI на кластер Docker Swarm с Docker Flow Proxy.

- Docker
- [Docker Flow Proxy](http://git.zolotoykod.ru/zk/docker-proxy-letsencrypt)

### Переменные окружения

Для конфигурации приложения используются переменные окружения. Перед деплоем приложения необходимо задать их в настройках проекта *[Settings > CI & CD > Secret variables](http://git.zolotoykod.ru/help/ci/variables/README#secret-variables)*.

Имя переменной | Описание | Значение по-умолчанию | Пример
--- | --- | --- | ---
`NODE_ENV` | окружение Node.js | `development` | `production` 
`ENVIRONMENT` | название окружения в котором запускается приложение | `development` | `(development|staging|production)`
`PRODUCTION_DOMAIN` | доменное имя продакшн хоста | |<% if (stack === 'bitrix') { %>
`MYSQL_PASSWORD` | пароль пользователя MySQL | |
`MYSQL_ROOT_PASSWORD` | пароль root пользователя MySQL | |<% } else if (stack === 'node') { %>
`MONGO_URI` | uri для подключения к MongoDB | `mongodb://mongo:27017/<%=appname%>` |
`COOKIE_SECRET` | соль для хэширования куки | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095cd3ddfd7d3d0a3af083bc4ddf31d404c06e065a6e56fa882f104e880b405bb9f`
`NODEMAILER_SMTP_HOST` | хост SMTP | `mail.zolotoykod.ru` |
`NODEMAILER_SMTP_PORT` | порт SMTP | `25` |
`NODEMAILER_SENDER_EMAIL` | адрес отправителя email | | `noreply@yourdomain.ru`
`DEBUG_APP` | имя приложения для отладки (используется с pm2) | `<%=appname%>` |
`PORT` | порт приложения | `3000` |<% } else if (stack === 'web') { %>
`MYSQL_PASSWORD` | пароль пользователя MySQL | |
`MYSQL_ROOT_PASSWORD` | пароль root пользователя MySQL | |<% } else if (stack === 'wordpress') { %>
`MYSQL_PASSWORD` | пароль пользователя MySQL | |
`MYSQL_ROOT_PASSWORD` | пароль root пользователя MySQL | |
`DB_NAME` | имя базы данных | `wordpress` |
`DB_USER` | имя пользователя базы данных | `wordpress` |
`DB_PASSWORD` | пароль пользователя базы данных | `${MYSQL_PASSWORD}` |
`DB_HOST` | хост базы данных | `mysql` |
`WP_HOME` | | `http://${DOMAIN}` |
`AUTH_KEY` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`SECURE_AUTH_KEY` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`LOGGED_IN_KEY` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`NONCE_KEY` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`AUTH_SALT` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`SECURE_AUTH_SALT` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`LOGGED_IN_SALT` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`
`NONCE_SALT` | настройки безопасности WordPress (64 символа). [Генератор](https://api.wordpress.org/secret-key/1.1/salt/) | | `8626276f99834111d7670f359994eb46c10590c0881a4e6cf923a4fbf7e5a095`<% } %>

## Разработано с использованием
<% if (stack === 'bitrix') { %>
* [1С-Битрикс](http://1c-bitrix.ru/) - Профессиональная система управления сайтом
* [Bitrix-migrations](https://github.com/arrilot/bitrix-migrations) - Миграции БД для Битрикса
* [Env](https://github.com/oscarotero/env) - Simple library to read environment variables and convert to simple types<% } else if (stack === 'node') { %>
* [Keystone](http://keystonejs.com/) - Node.js framework
* [bunyan](https://github.com/trentm/node-bunyan) - a simple and fast JSON logging module for node.js services
* [gm](https://github.com/aheckmann/gm) - GraphicsMagick for node
* [express-restify-mongoose](https://florianholzapfel.github.io/express-restify-mongoose/) - Easily create a flexible REST interface for mongoose models
* [mongoose-search-plugin](https://github.com/pavelvlasov/mongoose-search-plugin) - Simple mongoose plugin for full text search. Uses natural stemming and distance algorithms
* [nodemailer](http://nodemailer.com/) - Send e-mails from Node.js – easy as cake! 🍰✉️<% } else if (stack === 'web') { %>
* [Env](https://github.com/oscarotero/env) - Simple library to read environment variables and convert to simple types<% } else if (stack === 'wordpress') { %>
* [WordPress](https://wordpress.org/) - Popular CMS
* [Env](https://github.com/oscarotero/env) - Simple library to read environment variables and convert to simple types<% } %>
* [Angular](https://angular.io/) - Frontend framework
* [UIkit](https://getuikit.com/) - A lightweight and modular front-end framework for developing fast and powerful web interfaces.
