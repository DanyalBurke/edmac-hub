
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