<?php
$home = preg_replace('#/(home|Users)/([^/]+)/.*#', "/$1/$2", __FILE__);

ini_set("log_errors", 1);
ini_set("error_log", $home . "/phplogs/log");
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
list($mysql_database, $mysql_username, $mysql_password) = explode(":", file_get_contents($home . "/mysql_credentials"), 3);

$conn = new mysqli("127.0.0.1", trim($mysql_username),  trim($mysql_password), trim($mysql_database));
$conn->query("SET time_zone = '+01:00'");

$local_now = new DateTime('now', new DateTimeZone("Europe/London"));
$local_time = $local_now->format("H:i:s");
$local_date = $local_now->format("Y-m-d");

if ($conn->connect_error) {
    error_log("Database failure: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

function inputAsJson() {
    $raw_input = file_get_contents('php://input');
    error_log("input: " . $raw_input);
    return json_decode($raw_input, true);
}

function rows($result, $row_transformer) {
    $array = [];
    while ($row = $result->fetch_assoc()) {
        $array[] = $row_transformer($row);
    }
    return $array;
}

?>