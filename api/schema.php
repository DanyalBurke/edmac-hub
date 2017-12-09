<?php
include 'init.php';

die('Schema API not available currently');

$schema = <<<EOD
DROP TABLE IF EXISTS intentions;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS feedback;

CREATE TABLE intentions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  visit_time TIME NOT NULL,
  visit_date DATE NOT NULL,

  UNIQUE KEY (`name`, `visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE messages (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  name    VARCHAR(255) NOT NULL,
  visit_date DATE NOT NULL,
  message VARCHAR(100) NOT NULL,
  UNIQUE KEY (`name`, `visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE feedback (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  name    VARCHAR(255) NOT NULL,
  feedback_date DATETIME NOT NULL,
  email VARCHAR(255) NOT NULL,
  message text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
EOD;

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