<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM intentions WHERE visit_date >= '$local_date'");
        if ($conn->error) {
            error_log( "GET failure: " . $conn->error);
            die($conn->error);
        }
        print json_encode(rows($result, function($row) {
            return array('name' => $row['name'], 'visitTime' => $row['visit_time'], 'visitDate' => $row['visit_date'], 'parkingSpace' => $row['parking_space'] == '1' ? true : false);
        }));
        break;
    case 'POST':
        $post = inputAsJson();
        $statement = $conn->prepare("INSERT INTO intentions (name, visit_time, visit_date, parking_space) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE visit_time = ?, parking_space = ?");
        $statement->bind_param("sssisi", $post['name'], $post['visitTime'], $post['visitDate'], $post['parkingSpace'], $post['visitTime'], $post['parkingSpace']);
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
        $statement = $conn->prepare("DELETE FROM intentions WHERE name = ? AND visit_date = ?");
        $statement->bind_param("ss", $delete['name'], $delete['visitDate']);
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