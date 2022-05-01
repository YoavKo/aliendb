const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
mysql = require('mysql2');


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
    getAll: "SELECT * FROM aliens",
    getId: "SELECT * FROM aliens WHERE id = ?",
    getSupervisedAliensIds: "SELECT id FROM aliens WHERE commander_id = ?",
    getNameById: "SELECT name FROM aliens WHERE id = ?"
};


// utils funcs
const buildIdNameDict = (allAliens) => {
    const res = {};
    allAliens.forEach(alian => { res[alian.id] = alian.name });
    return res;
};
 
const getSupervisedAliensIdsFromDB = (id) => {
    let ids = [];
    db.query(querysTamlates.getSupervisedAliensIds, [id], (err, results) =>{
        results.forEach(res => ids.push(res.id));
    });
    return ids;
    console.log(ids);
};


const getCommanderMameFromDB = async function(commander_id){
    let commander_name = "";
    let q = await db.query(querysTamlates.getNameById, [commander_id]);
    console.log("@@@@ ", q);
    q.then(res => commander_name = res);
    return commander_name;
        /*
        , (err, res) => {
        console.log('res-1', res[0].name);
        commander_name =  res[0].name;
        return commander_name;
    }); */
};

// input validation:


// API funcs:
const getAll = function(ctx){ 
    db.query(querysTamlates.getAll, (err, allAliens) => {
        //console.log(results);
        const id_name_dict = buildIdNameDict(allAliens);

        allAliens.forEach(alien => { 
            alien.commander_name = id_name_dict[alien.commander_id];
            delete alien.type;
            delete alien.vehicle;
        });
        
        ctx.body = allAliens;
        //ctx.type = "application/json";
        //ctx.status = 200;
    });
};

const getAlien = function(ctx){ 
    const id = ctx.params.id;
    db.query(querysTamlates.getId, [id], (err, alien) => {
        //console.log(results);
        alien = alien[0];
        // alien.commander_name = getCommanderMameFromDB(alien.commander_id);
        // alien.supervised_aliens_ids = getSupervisedAliensIdsFromDB(alien.id);
        delete alien.type;
        delete alien.vehicle;

        ctx.body = alien;

        //console.log(ctx.response);
    });



};

const updateAlien = function(ctx){ 
    ctx.body = `updateAlien ${ctx.params.id} data[${JSON.stringify(ctx.request.body)}]\n`
    /*
    console.log(ctx.request);
    ctx.response.body = ctx.request.body;
    ctx.response.body.method = ctx.request.method; 
    console.log(ctx.response)
    */
};


const newAlien = function(ctx){ 
    ctx.body = `newAlien data[${JSON.stringify(ctx.request.body)}]\n`
};


// routing:
router.get('/', getAll);
router.get('/:id', getAlien);
router.put('/:id', updateAlien);
router.post('/', newAlien);

app.use(router.routes());

app.listen(1212);
