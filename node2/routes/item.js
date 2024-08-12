const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');



router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'item/center'});
    })
    .get("/item1",(req,res)=>{
        conn = db_connect.getConnection();
        conn.query(db_sql.item_select, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;
                } else {
                    console.log(result);
                    res.render('index', { 'centerpage': 'item/item1', 'items': result });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    .get("/item2",(req,res)=>{  
        res.render('index',{'centerpage':'item/item2'});
    })
    .get("/item3",(req,res)=>{  
        res.render('index',{'centerpage':'item/item3'});
    })

module.exports = router;