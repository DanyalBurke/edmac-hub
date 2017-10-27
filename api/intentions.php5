<?php
$conn = new mysqli("localhost", "youmo3_edmachub", "eve4NxcUaE]N", "youmo3_edmachub");
$conn->query("SET time_zone = 'Europe/London'");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $array = [];
        $result = $conn->query("SELECT * FROM intentions WHERE visit_date = CURRENT_DATE()");
        while ($row = $result->fetch_assoc()) {
            $array[] = array('name' => $row['name'], 'time' => (int)$row['visit_time']);
        }
        print json_encode($array);
        break;
    case 'POST':
        $raw_post = file_get_contents('php://input');
        $post = json_decode($raw_post, true);
        $statement = $conn->prepare("INSERT INTO intentions (name, visit_time, visit_date) VALUES (?, ?, CURRENT_DATE()) ON DUPLICATE KEY UPDATE visit_time = ?");
        $statement->bind_param("sii", $post['name'], $post['time'], $post['time']);
        $statement->execute();
        if ($statement->error) {
            print $statement->error;
        } else {
            print "OK";
        }
        break;
    case 'DELETE':
        print 'OK';
        break;
    default:
        print '405 - unrecognized method';
        break;

}

?>