mysql = require('mysql2')
const fs = require('fs');

const db = mysql.createConnection({
          user: 'root',
          password: 'example',
          database: 'aliensdb'
});

db.query('DELETE FROM aliens;');

const strOrNULL = (str) => { return str ? `\"${str}\"` : "NULL"; };

const insertQueryPrefix = 'INSERT INTO aliens(id, commander_id, name, weapon, vehicle, type) VALUES (';
fs.readFile('db.json', (err, data)=>{
    const parseData = Object.entries(JSON.parse(data)).reverse();
    parseData.forEach(([type, aliens]) => {
        aliens.forEach(alien => {
            const q = insertQueryPrefix + `${alien.id}, ${alien.commanderId || "NULL"}, "${alien.name}" , ${strOrNULL(alien.weapon)}, ${strOrNULL(alien.vehicle)}, \"${type}\");`;
            db.query(q);
            //console.log(q);
        });
    });
});

