<?php
/** @var string Document Root */
$webroot_dir = __DIR__ . '/../..';

/**
 * Expose global env() function from oscarotero/env
 */
Env::init();

/**
 * Set up our global environment constant and load its config first
 * Default: production
 */
define('WP_ENV', env('ENVIRONMENT') ?: 'production');

/**
 * Load environment specific config
 */
$env_config = __DIR__ . '/environments/' . WP_ENV . '.php';
if (file_exists($env_config))
    require_once $env_config;

/**
 * URLs
 */
define('WP_HOME', env('WP_HOME'));
define('WP_SITEURL', WP_HOME . '/wp');

/**
 * Custom Content Directory
 */
define('CONTENT_DIR', '/app');
define('WP_CONTENT_DIR', $webroot_dir . CONTENT_DIR);
define('WP_CONTENT_URL', WP_HOME . CONTENT_DIR);

/**
 * DB settings
 */
define('DB_NAME', env('DB_NAME'));
define('DB_USER', env('DB_USER'));
define('DB_PASSWORD', env('DB_PASSWORD'));
define('DB_HOST', env('DB_HOST') ?: 'localhost');
define('DB_CHARSET', 'utf8mb4');
define('DB_COLLATE', '');
$table_prefix = env('DB_PREFIX') ?: 'wp_';

/**
 * Authentication Unique Keys and Salts
 */
define('AUTH_KEY', env('AUTH_KEY'));
define('SECURE_AUTH_KEY', env('SECURE_AUTH_KEY'));
define('LOGGED_IN_KEY', env('LOGGED_IN_KEY'));
define('NONCE_KEY', env('NONCE_KEY'));
define('AUTH_SALT', env('AUTH_SALT'));
define('SECURE_AUTH_SALT', env('SECURE_AUTH_SALT'));
define('LOGGED_IN_SALT', env('LOGGED_IN_SALT'));
define('NONCE_SALT', env('NONCE_SALT'));

/**
 * Custom Settings
 */
define('AUTOMATIC_UPDATER_DISABLED', true);
define('DISABLE_WP_CRON', env('DISABLE_WP_CRON') ?: false);
define('DISALLOW_FILE_EDIT', true);

/**
 * Memcached Settings
 */
if (file_exists(dirname(__FILE__) . '/memcached.php'))
	$memcached_servers = include dirname(__FILE__) . '/memcached.php';

/**
 * Bootstrap WordPress
 */
if (!defined('ABSPATH'))
    define('ABSPATH', $webroot_dir . '/wp/');
