<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM messages WHERE visit_date = '$local_date'");
        if ($conn->error) {
            error_log("GET failure: " . $conn->error);
            die($conn->error);
        }
        print json_encode(rows($result, function($row) {
            return array('name' => $row['name'], 'message' => $row['message']);
        }));
        break;
    case 'POST':
        $post = inputAsJson();
        $statement = $conn->prepare("INSERT INTO messages (name, visit_date, message) VALUES (?, '$local_date', ?) ON DUPLICATE KEY UPDATE message = ?");
        $statement->bind_param("sss", $post['name'], $post['message'], $post['message']);
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