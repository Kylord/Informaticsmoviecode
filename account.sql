DROP TABLE IF EXISTS account;

-- This a table to hold user accounts
CREATE TABLE account (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  hashedpass VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO account (username, hashedpass) VALUES ('kylelang','$2a$12$UY3kcoEvneP5ygC2iCdKNOSB4TQY7InVa7Q0HU8HtxrOgTqzAH7qi');