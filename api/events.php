<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT name, event_date FROM events WHERE event_date > DATE_ADD(DATE(UTC_TIMESTAMP), INTERVAL 7 DAY) AND event_date < DATE(UTC_TIMESTAMP)");
        if ($conn->error) {
            error_log("GET failure: " . $conn->error);
            die($conn->error);
        }
        print json_encode(rows($result, function($row) {
            return array('name' => $row['name'], 'visitTime' => $row['visit_time']);
        }));
        break;
    case 'POST':
        $post = inputAsJson();
        $statement = $conn->prepare("INSERT INTO visitors (name, visit_time, visit_date) VALUES (?, CURRENT_TIME(), DATE(UTC_TIMESTAMP))");
        $statement->bind_param("s", $post['name']);
        $statement->execute();
        if ($statement->error) {
            error_log("POST failure: " . $statement->error);
            die($statement->error);
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