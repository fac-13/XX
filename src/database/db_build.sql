/* Initial database schema */

BEGIN;

DROP TABLE IF EXISTS users, places, reviews CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE places (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone_number VARCHAR(100),
  website VARCHAR(255),
  description VARCHAR(255) NOT NULL,
  picture VARCHAR(255) 
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) NOT NULL,
  place_id INT REFERENCES places(id) NOT NULL,
  comment VARCHAR(255),
  review_date DATE NOT NULL,
  positive BOOLEAN NOT NULL
);

INSERT INTO users (name) 
VALUES ('Katia'), ('Tammy'), ('Jennah'), ('Parissa');

INSERT INTO places (name, description)
VALUES ('Costa Coffee', 'Coffee shop');

INSERT INTO reviews (user_id, place_id, review_date, positive)
VALUES (1, 1,'2018-03-15', false);

COMMIT;