<?php
$home = preg_replace('#/(home|Users)/([^/]+)/.*#', "/$1/$2", __FILE__);

ini_set("log_errors", 1);
ini_set("error_log", $home . "/phplogs/log");

list($mysql_database, $mysql_username, $mysql_password) = explode(":", file_get_contents($home . "/mysql_credentials"), 3);

$conn = new mysqli("localhost", trim($mysql_username),  trim($mysql_password), trim($mysql_database));
$conn->query("SET time_zone = 'Europe/London'");

if ($conn->connect_error) {
    error_log("Database failure: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

function inputAsJson() {
    $raw_input = file_get_contents('php://input');
    error_log("input: " + $raw_input);
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