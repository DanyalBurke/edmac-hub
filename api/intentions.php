<?php
include 'init.php';

function time_slots_next_2_hours($start_str) {
    $time_slots = array();
    $start = strtotime("1970-01-01 $start_str");
    $end = strtotime('+2 hours', $start);
    for($time = $start; $time < $end; $time = strtotime('+15 minutes', $time)) {
        $time_slots[] = date('H:i', $time);
    }
    return $time_slots;
}

function validate_parking_space_booking($conn, $post) {
    $parking_space_statement = $conn->prepare("SELECT COUNT(*) parking_slots FROM intentions WHERE visit_date = ? AND visit_time <= ? AND visit_time > SUBTIME(CAST(? AS TIME), '2:00:00') AND parking_space = 1 AND name <> ?");
    $time_slots = time_slots_next_2_hours($post['visitTime']);
    foreach($time_slots as $time_slot) {
        $parking_space_statement->bind_param("ssss", $post['visitDate'], $time_slot, $time_slot, $post['name']);
        $parking_space_statement->execute();
        die_on_error($parking_space_statement, "validate parking space intentions");
        $size = $parking_space_statement->get_result()->fetch_assoc()['parking_slots'];
        if ($size >= 4) {
            return false;
        }
    }
    return true;
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM intentions WHERE visit_date >= '$local_date'");
        die_on_error($conn, "GET intentions");
        print json_encode(rows($result, function($row) {
            return array('name' => $row['name'], 'visitTime' => $row['visit_time'], 'visitDate' => $row['visit_date'], 'parkingSpace' => $row['parking_space'] == '1' ? true : false);
        }));
        break;
    case 'POST':
        $post = inputAsJson();
        $parking_space = $post['parkingSpace'] == true;
        if($parking_space && !validate_parking_space_booking($conn, $post)) {
            http_response_code(409);
            print '409 - parking space conflict';
            break;
        }

        $statement = $conn->prepare("INSERT INTO intentions (name, visit_time, visit_date, parking_space) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE visit_time = ?, parking_space = ?");
        $statement->bind_param("sssisi", $post['name'], $post['visitTime'], $post['visitDate'], $parking_space, $post['visitTime'], $post['parkingSpace']);
        $statement->execute();
        die_on_error($statement, "POST intentions");
        print "OK";
        break;
    case 'DELETE':
        $delete = inputAsJson();
        $statement = $conn->prepare("DELETE FROM intentions WHERE name = ? AND visit_date = ?");
        $statement->bind_param("ss", $delete['name'], $delete['visitDate']);
        $statement->execute();
        die_on_error($statement, "DELETE intentions");
        print "OK";
        break;
    default:
        http_response_code(405);
        print '405 - unrecognized method';
        break;
}

?>