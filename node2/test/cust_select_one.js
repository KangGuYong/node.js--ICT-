var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'id05';

let values = [id];

conn.query(db_sql.cust_select_one, values, (e, result, fields) => {
    if(e){
        console.log('Select_one Error');
        console.log(e);
    }else{
        console.log('Select_one OK !');
        console.log(JSON.stringify(result));
    }
    db_connect.close(conn);
});