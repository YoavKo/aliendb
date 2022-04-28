# Aliens DB App
===============


## DB implemantions notes:

* I considered handle the input validation by SQL constraints by holdings tables which decler 
  "licenses to use"  of weapons and vehicles for specific types of aliens. I drop this idea and 
  choosed to implament this roles by JS, for reduce the number of DB requests.

* I chose a direct approach in designing one table of data, as follows:
    mysql> DESCRIBE aliens;
    +--------------+-----------------+------+-----+---------+----------------+
    | Field        | Type            | Null | Key | Default | Extra          |
    +--------------+-----------------+------+-----+---------+----------------+
    | id           | bigint unsigned | NO   | PRI | NULL    | auto_increment |
    | commander_id | bigint unsigned | YES  | MUL | NULL    |                |
    | name         | varchar(255)    | YES  |     | NULL    |                |
    | type         | varchar(255)    | YES  |     | NULL    |                |
    | weapon       | varchar(255)    | YES  |     | NULL    |                |
    | vehicle      | varchar(255)    | YES  |     | NULL    |                |
    +--------------+-----------------+------+-----+---------+----------------+

