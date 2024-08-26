var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');
conn = db_connect.getConnection();


conn.query(db_sql.cart_select, function (e, result, fields) {
    if(e){
        console.log('Select Error');
        console.log('Error Message:')+e;
    }else{
        console.log(result);
        console.log(JSON.stringify(result));
    }
    db_connect.close(conn);
});