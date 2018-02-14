<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php";
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

// FIX Request base
$_SERVER['SCRIPT_NAME'] = '';

require_once __DIR__ .'/v1/index.php';

Flight::start();
