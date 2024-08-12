var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'id04';
let pwd = 'pwd0123';
let name = '강구용';
let acc = '8172';

let values = [id,pwd,name,acc];

conn.query(db_sql.cust_insert, values, (e, result, fields) => {
    if(e){
        console.log('Insert Error');
        console.log(e);
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});