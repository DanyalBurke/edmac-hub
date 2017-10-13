<?php
$conn = new mysqli("localhost", "youmo3_edmachub", "eve4NxcUaE]N", "youmo3_edmachub");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $result = $conn->query("SELECT * FROM intentions");
        while( $row = $result->fetch_assoc() ){
            $array[]= $row;
        }
        print json_encode($array);
        break;
    case 'POST':
        $conn->query("INSERT INTO ")
        print 'ok';
    case 'DELETE':
        print 'ok';
    default:
        print '405 - unrecognized method';

}

?>