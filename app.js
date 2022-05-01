const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const mysql = require('mysql2');
const bluebird = require('bluebird');

// midelwear - setup;
const app = new Koa();
const router = new Router();
const db = mysql.createConnection({
                    user: 'root',
                    password: 'example',
                    database: 'aliensdb'
});


app.use(bodyParser());

const querysTamlates = {
    getAll: `   SELECT A.id, A.name, A.weapon, A.commander_id, B.name AS commander_name
                FROM aliens A LEFT JOIN aliens B ON A.commander_id = B.id
                GROUP BY A.id; `,
    
    getId: `SELECT A.id, A.name, A.weapon, A.commander_id, B.name AS commander_name,
                   GROUP_CONCAT(C.id) AS supevised_ids
            FROM aliens A LEFT JOIN aliens B ON A.commander_id = B.id
                LEFT JOIN aliens C ON A.id = C.commander_id
            WHERE  A.id = ?;`,

    updateId: `UPDATE aliens SET name = ?, weapon = ?, vehicle = ? WHERE id = ?`,

    insert: `INSERT INTO aliens(commander_id, name, weapon, vehicle, type) 
              VALUES (?, ?, ?, ?, ?)`
};



// input validation:
const validateInsert = function(values){
    //TODO impl
    // is commander_id exist in db and by the commaner's type if cane manege 
    // 1 more and if the type of the new alien is one rank below the commander's type. 
    // -  can be done with 1 sql req of bool calcolation.
    // 
    // is the weapon or vehicle are aloowed to it's type.
    // -  can be check only use <values>.-   
    return true;
};

const validateUpdate = function(values){
    //TODO impl
    // is the weapon or vehicle are aloowed to it's type.
    // -  can be done with 1 sql req or get the alien's type, and then lockaly..
    return true;
};


// API funcs:
const getAll = function(ctx){ 
    db.promise().query(querysTamlates.getAll)
        .then((res) => {
            ctx.response.body = res[0];
            ctx.set('content-type', 'application/json');
            ctx.status = 200;
            console.log(ctx.response);
        });
};

const getAlien = function(ctx){ 
    const id = ctx.params.id;
    db.promise().query(querysTamlates.getId, [id])
    .then((res) => {
        alien = res[0][0];
        ctx.body = alien;
        console.log(ctx.response);
    });
};

const updateAlien = function(ctx){ 
    const reqData = ctx.request.body;
    
    const id = ctx.params.id;
    const name = reqData.name;
    const weapon = reqData.weapon;
    const vehicle = reqData.vehicle;
    const valuseArray = [name, weapon, vehicle, id];

    if(validateUpdate(valuseArray)) {
        db.promise().query(querysTamlates.updateId, valuseArray)
            .then((res) => {
                console.log(res);
                ctx.status = 204;
                console.log(ctx.response);
            });
    } else {
        //TODO handle bad reqwest.
    }
};


const newAlien = function(ctx){ 

    const reqData = ctx.request.body;
    
    const commander_id = reqData.commander_id;
    const name = reqData.name;
    const weapon = reqData.weapon;
    const vehicle = reqData.vehicle;
    const type = reqData.type;
    const valuseArray = [commander_id, name, weapon, vehicle, type];

    if(validateInsert(valuseArray)) {
        db.promise().query(querysTamlates.insert, valuseArray)
            .then((res) => {
                console.log(res);
                ctx.status = 201;
                console.log(ctx.response);
            });
    } else {
        //TODO handle bad reqwest.
    }
};


// routing:
router.get('/', getAll);
router.get('/:id', getAlien);
router.put('/:id', updateAlien);
router.post('/', newAlien);

app.use(router.routes());

app.listen(1212);
