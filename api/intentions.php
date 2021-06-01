<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM intentions WHERE visit_date = '$local_date'");
        if ($conn->error) {
            error_log( "GET failure: " . $conn->error);
            die($conn->error);
        }
        print json_encode(rows($result, function($row) {
            return array('name' => $row['name'], 'visitTime' => $row['visit_time']);
        }));
        break;
    case 'POST':
        $post = inputAsJson();
        $statement = $conn->prepare("INSERT INTO intentions (name, visit_time, visit_date) VALUES (?, ?, '$local_date') ON DUPLICATE KEY UPDATE visit_time = ?");
        $statement->bind_param("sss", $post['name'], $post['visitTime'], $post['visitTime']);
        $statement->execute();
        if ($statement->error) {
            error_log("POST failure: " . $statement->error);
            die($statement->error);
        } else {
            print "OK";
        }
        break;
    case 'DELETE':
        $delete = inputAsJson();
        $statement = $conn->prepare("DELETE FROM intentions WHERE name = ? AND visit_date = '$local_date'");
        $statement->bind_param("s", $delete['name']);
        $statement->execute();
        if ($statement->error) {
            error_log("DELETE failure: " . $statement->error);
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