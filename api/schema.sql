DROP TABLE IF EXISTS intentions;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS visitors;

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

CREATE TABLE visitors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  visit_time TIME NOT NULL,
  visit_date DATE NOT NULL,
  INDEX (`visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  detail VARCHAR(255) NOT NULL DEFAULT "",
  INDEX (`event_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
