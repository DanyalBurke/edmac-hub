<?php
ini_set("log_errors", 1);
ini_set("error_log", "/home/youmo3/phplogs/log");

$conn = new mysqli("localhost", "youmo3_edmachub", "eve4NxcUaE]N", "youmo3_edmachub");
$conn->query("SET time_zone = 'Europe/London'");

//if (rand(1,2) ==1) {
//    http_response_code(500);
//    die("Randomly die");
//}
if ($conn->connect_error) {
    error_log("Database failure: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $array = [];
        $result = $conn->query("SELECT * FROM intentions WHERE visit_date = DATE(UTC_TIMESTAMP)");
        while ($row = $result->fetch_assoc()) {
            $array[] = array('name' => $row['name'], 'visitTime' => $row['visit_time']);
        }
        print json_encode($array);
        break;
    case 'POST':
        $raw_post = file_get_contents('php://input');
        error_log($raw_post);
        $post = json_decode($raw_post, true);
        $statement = $conn->prepare("INSERT INTO intentions (name, visit_time, visit_date) VALUES (?, ?, DATE(UTC_TIMESTAMP)) ON DUPLICATE KEY UPDATE visit_time = ?");
        $statement->bind_param("ssi", $post['name'], $post['visitTime'], $post['visitTime']);
        $statement->execute();
        if ($statement->error) {
            error_log("POST failure: " . $statement->error);
            print $statement->error;
        } else {
            print "OK";
        }
        break;
    case 'DELETE':
        $raw_delete = file_get_contents('php://input');
        $delete = json_decode($raw_delete, true);
        $statement = $conn->prepare("DELETE FROM intentions WHERE name = ? AND visit_date = DATE(UTC_TIMESTAMP)");
        $statement->bind_param("s", $delete['name']);
        $statement->execute();
        if ($statement->error) {
            error_log("DELETE failure: " . $statement->error);
            print $statement->error;
        } else {
            print "OK";
        }
        break;
    default:
        http_response_code(405);
        print '405 - unrecognized method';
        break;
}

error_log("intentions.php5 Used memory: " . memory_get_usage());

?>