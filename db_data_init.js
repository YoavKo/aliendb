mysql = require('mysql2')
const fs = require('fs');

const db = mysql.createConnection({
          user: 'root',
          password: 'example',
          database: 'aliensdb'
});

db.query('DELETE FROM aliens;');

const strOrNULL = (str) => { return str ? str : null; };

const insertQuery = `INSERT INTO aliens(id, commander_id, name, weapon, vehicle, type) 
                     VALUES ( ?, ?, ?, ?, ?, ?)`;

fs.readFile('db.json', (err, data)=>{
    const parseData = Object.entries(JSON.parse(data)).reverse();
    const promises = [];

    parseData.forEach(([type, aliens]) => {
        aliens.forEach(alien => {
            const commander_id = alien.commanderId || null;
            const weapon = strOrNULL(alien.weapon);
            const vehicle = strOrNULL(alien.vehicle);
            const valuseArray = [ alien.id, commander_id, alien.name, weapon, vehicle, type];
            
            promises.push(db.promise().query(insertQuery, valuseArray));
        });
    });
    Promise.all(promises).then(() => process.exit());
});


