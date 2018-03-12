<?php
include 'init.php';

//die('Schema API not available currently');

$schema = file_get_contents("schema.sql");

foreach(explode(';', $schema) as $command) {
    $result = $conn->query($command);
    if (!$result) {
        echo $conn->error;
    }
}
$result = $conn->query("SHOW TABLES");
while($row = $result->fetch_assoc()) {
    print_r($row);
}

?>