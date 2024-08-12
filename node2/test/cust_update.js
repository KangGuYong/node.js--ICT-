var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let pwd = 'pwd8172';
let name = '용구강';
let acc = '73748172';
let id = 'id04';

let values = [pwd,name,acc,id];

conn.query(db_sql.cust_update, values, (e, result, fields) => {
    if(e){
        console.log('Update Error');
        console.log(e);
    }else{
        console.log('Updare OK !');
    }
    db_connect.close(conn);
});