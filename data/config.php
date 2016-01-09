<?php
// database host
$ip = $_SERVER['SERVER_ADDR'];

if (isGuangFuServer($ip)) {
        $db_host   = "localhost:3306";
        $db_name   = "guangfujie";
        $db_user   = "root";
        $db_pass   = "Dsh12345";
} else {
        $db_host   = "localhost:3306";
        $db_name   = "guangfujie";
        $db_user   = "root";
        $db_pass   = "";
}

function isGuangFuServer($ip) {
    return $ip == '112.124.98.9';
}

// table prefix
$prefix    = "ecs_";

$timezone    = "PRC";

$cookie_path    = "/";

$cookie_domain    = "";

$session = "1440";

define('EC_CHARSET','utf-8');

define('ADMIN_PATH','admin');

define('AUTH_KEY', 'this is a key');

define('OLD_AUTH_KEY', '');

define('API_TIME', '');

?>