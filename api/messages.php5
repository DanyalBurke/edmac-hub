<?php
$conn = new mysqli("localhost", "youmo3_edmachub", "eve4NxcUaE]N", "youmo3_edmachub");
$conn->query("SET time_zone = 'Europe/London'");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $array = [];
        $result = $conn->query("SELECT * FROM messages WHERE visit_date = DATE(UTC_TIMESTAMP)");
        while ($row = $result->fetch_assoc()) {
            $array[] = array('name' => $row['name'], 'message' => $row['message']);
        }
        print json_encode($array);
        break;
    case 'POST':
        $raw_post = file_get_contents('php://input');
        $post = json_decode($raw_post, true);
        $statement = $conn->prepare("INSERT INTO messages (name, visit_date, message) VALUES (?, DATE(UTC_TIMESTAMP), ?) ON DUPLICATE KEY UPDATE message = ?");
        $statement->bind_param("sss", $post['name'], $post['message'], $post['message']);
        $statement->execute();
        if ($statement->error) {
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