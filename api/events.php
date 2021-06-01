<?php
include 'init.php';

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $query = "SELECT name, DATE_FORMAT(event_date, '%d/%m/%Y') as event_date, detail FROM events";
        if (isset($_GET['days']) and is_numeric($_GET['days'])) {
            $query .= " WHERE '$local_date' >= DATE_ADD(event_date, INTERVAL -${_GET['days']} DAY) AND '$local_date' <= event_date";
        }
        $result = $conn->query($query);

        if ($conn->error) {
            error_log("GET failure: " . $conn->error);
            die($conn->error);
        }
        if (isset($_GET['output']) and "csv" == $_GET['output']) {
            header("Content-Type: text/csv");
            header('Content-Disposition: attachment; filename="events.csv"');
            while ($row = $result->fetch_assoc()) {
                $out = fopen('php://output', 'w');
                fputcsv($out, array($row['event_date'], $row['name'], $row['detail']));

            }
        } else {
            header("Content-Type: application/json");
            print json_encode(rows($result, function ($row) {
                return array('name' => $row['name'], 'eventDate' => $row['event_date'], 'detail' => $row['detail']);
            }));
        }
        break;
    case 'POST':
        if(preg_match('#multipart/form-data#i', $_SERVER["CONTENT_TYPE"])) {
            $csvFile = file($_FILES['events']['tmp_name']);
        }
        else if($_SERVER["CONTENT_TYPE"] == 'text/csv') {
            $csvFile = file('php://input');
        }
        else {
            http_response_code(415);
            print "415 - Unsupported media type";
            break;
        }

        $data = [];
        foreach ($csvFile as $line) {
            $data[] = str_getcsv($line);
        }

        $statement = $conn->query("DELETE FROM events");
        foreach ($data as $row) {
            if (count($row) >= 2) {
                $event_date = trim($row[0]);
                $name = trim($row[1]);
                $detail = isset($row[2]) ? trim($row[2]) : "";
                $statement = $conn->prepare("INSERT INTO events (name, event_date, detail) VALUES (?, STR_TO_DATE(?, '%d/%m/%Y'), ?)");
                $statement->bind_param("sss", $name, $event_date, $detail);
                $statement->execute();
            }
        }
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