<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

require_once __DIR__ . '/../../vendor/autoload.php';

if ($_ENV['ENVIRONMENT'] === 'development')
	Arrilot\BitrixMigrations\Autocreate\Manager::init($_SERVER["DOCUMENT_ROOT"].'/migrations');
