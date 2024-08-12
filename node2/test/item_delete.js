var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = '3';

let values = [id];

conn.query(db_sql.item_delete, values, (e, result, fields) => {
    if(e){
        console.log('Delete Error');
        console.log(e);
    }else{
        console.log('Delete OK !');
    }
    db_connect.close(conn);
});