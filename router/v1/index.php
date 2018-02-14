<?php
use goldencode\Bitrix\Restify\Restify;
//use goldencode\Bitrix\Restify\RestifyCatalog;
//use goldencode\Bitrix\Restify\RestifyCategory;
//use goldencode\Bitrix\Restify\RestifyOrder;
use goldencode\Bitrix\Restify\RestifyUser;
//use goldencode\Bitrix\Restify\RestifyCart;

$UserApi = new RestifyUser([
	'defaults filter' => [],
	'defaults select' => [
		'ID',
		'ACTIVE',
		'LOGIN',
		'EMAIL',
		'NAME',
		'LAST_NAME',
		'XML_ID'
	]
]);

$BrandApi = new Restify([
	'iblock' => 'Brand',
	'defaults filter' => [],
	'defaults select' => [
		'ID',
		'ACTIVE',
		'NAME',
		'CODE',
		'XML_ID'
	]
]);

$ReferenceTagApi = new Restify([
	'iblock' => 'ReferenceTag',
	'defaults filter' => [],
	'defaults select' => [
		'ID',
		'ACTIVE',
		'NAME',
		'CODE',
		'XML_ID'
	]
]);
