<?php
ini_set("log_errors", 1);
ini_set("error_log", "/home/youmo3/phplogs/log");

$conn = new mysqli("localhost", "youmo3_edmachub", "eve4NxcUaE]N", "youmo3_edmachub");
$conn->query("SET time_zone = 'Europe/London'");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'POST':
        $raw_post = file_get_contents('php://input');
        $post = json_decode($raw_post, true);
        $statement = $conn->prepare("INSERT INTO feedback (name, feedback_date, email, message) VALUES (?, UTC_TIMESTAMP, ?, ?)");
        $statement->bind_param("sss", $post['name'], $post['email'], $post['message']);
        $statement->execute();
        if ($statement->error) {
            error_log("POST failure: " . $statement->error);
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

?>