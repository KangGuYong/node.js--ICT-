var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

conn = db_connect.getConnection();

let id = 'id99';

let values = [id];

conn.query(db_sql.cart_select_one, values, (e, result, fields) => {
    try {
        if (e) {
            console.log('Select_one Error');
            throw e;
        } else {
            console.log(result);
            console.log(JSON.stringify(result));
        }
    } catch (e) {
        console.log(e);
    } finally {
        db_connect.close(conn);
    }
});