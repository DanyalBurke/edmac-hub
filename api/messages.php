<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $array = [];
        $result = $conn->query("SELECT * FROM messages WHERE visit_date = DATE(UTC_TIMESTAMP)");
        if ($conn->error) {
            error_log("GET failure: " . $conn->error);
            die($conn->error);
        }
        else {
            while ($row = $result->fetch_assoc()) {
                $array[] = array('name' => $row['name'], 'message' => $row['message']);
            }
            print json_encode($array);
        }
        break;
    case 'POST':
        $raw_post = file_get_contents('php://input');
        error_log($raw_post);
        $post = json_decode($raw_post, true);
        $statement = $conn->prepare("INSERT INTO messages (name, visit_date, message) VALUES (?, DATE(UTC_TIMESTAMP), ?) ON DUPLICATE KEY UPDATE message = ?");
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

error_log("messages.php Used memory: " . memory_get_usage(true));

?>