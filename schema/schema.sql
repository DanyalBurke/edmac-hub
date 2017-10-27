
CREATE TABLE intentions (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  visit_time int NOT NULL,
  visit_date date NOT NULL,
  UNIQUE KEY (`name`, `visit_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;