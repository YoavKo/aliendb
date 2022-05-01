Aliens DB App
=============
at - 2022-05-01.

by - Yoav Kostiner.

Running the app:
----------------
to set the app for work you need to run the next instarcions:

| # |      Description             |                  cmd                    |
|---|------------------------------|-----------------------------------------|
| 1 | build and run DB container   | ``` $ docker-compose up -d --build ```  |
| 2 | install node packages        | ``` $ npm i                        ```  |
| 3 | insert initial data into DB  | ``` $ node db_data_init.js         ```  |
| 4 | finaly run the app           | ``` $ node app.js                  ```  |


API Docomantation:
------------------
I haved asket to implament the folloing commands;

* getAlien 
    - returns a specific alien from the dataset 
     (fields: id, name, weapon, commander id, commander name, and
      supervised alien ids list).

    - for this cmd you shuld send a GET request to localhost:1212/<alien_id>

    ```
        $ curl -XGET localhost:1212/3
    ```
     
* getAll
    - returns all aliens from the dataset
           (fields: id, name, weapon, commander id, and commander name).
    - for this cmd you shuld send a GET request to localhost:1212/

    ```
      $ curl -XGET localhost:1212/
    ```

* newAlien 
    - adds a new captured alien to the dataset.
    - for this cmd you shuld send a POST request to localhost:1212/ with it's record json 
      as the request body, make sure his commander is all redy in DB, and the alien has 
      lisence for the vehicle and weapon its holds, id will determined automatically.
    
    ```
    $ curl -XPOST localhost:1212/ -H "Content-Type:application/json" -d'{"name":"Avi", "weapon":"Pepper spray",
        "commander_id":4, "type":"alien-warrior"}'
    ```
 
* updateAlien
    - updates a specific alien information (only the name, weapon, and vehicle fields are updatable).              
    - for this cmd you shuld send a PUT request to localhost:1212/<alien_id> with the data to update 
      represents as json at the request body, make sure the alien has lisence for the vehicle and weapon its holds.
                
   ```
   $ curl -XPUT localhost:1212/3 -H "Content-Type:application/json" -d'{"name":"Yosi", "weapon":"Water gun"}'
   ```


Home Exam Implemantions Notes:
==============================

DB modoal:
----------
* I considered handle the input validation by SQL constraints by holdings tables which
  decler "licenses to use"  of weapons and vehicles for specific types of aliens. I drop
  this idea and choosed to implament this roles by JS, for reduce the number of DB 
  requests, and for the SQL-DB setings be easy to maintain.

* I chose a direct approach in designing one table of data, as follows:
    mysql> DESCRIBE aliens;

    | Field        | Type            | Null | Key | Default | Extra          |
    |--------------|-----------------|------|-----|---------|----------------|
    | id           | bigint unsigned | NO   | PRI | NULL    | auto_increment |
    | commander_id | bigint unsigned | YES  | MUL | NULL    |                |
    | name         | varchar(255)    | YES  |     | NULL    |                |
    | type         | varchar(255)    | YES  |     | NULL    |                |
    | weapon       | varchar(255)    | YES  |     | NULL    |                |
    | vehicle      | varchar(255)    | YES  |     | NULL    |                |
    

