CREATE DATABASE IF NOT EXISTS aliensdb;

USE aliensdb;

-- Tables creation 
DROP TABLE IF EXISTS aliens;
CREATE TABLE aliens (
    id              BIGINT UNSIGNED NOT NULL    AUTO_INCREMENT,
    commander_id    BIGINT UNSIGNED DEFAULT NULL, 
    name            VARCHAR(255)    DEFAULT NULL,
    type            VARCHAR(255)    DEFAULT NULL,
    weapon          VARCHAR(255)    DEFAULT NULL,
    vehicle         VARCHAR(255)    DEFAULT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (commander_id) REFERENCES aliens(id)
);

