const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

var goto = require('../util/goto');

router
    // .get("/",(req,res)=>{
    //     goto.go(req,res,{'centerpage':'useritem/center'});    
    //     // res.render('index',{'centerpage':'item/center'});
    // })
    .get("/",(req,res)=>{
        conn = db_connect.getConnection();
        conn.query(db_sql.item_select, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;
                } else {
                    console.log(result);
                    goto.go(req,res,{ 'centerpage': 'useritem/select', 'items': result });
                    // res.render('index', { 'centerpage': 'item/item1', 'items': result });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    //야메
    .get("/cart",(req,res)=>{
        conn = db_connect.getConnection();
        let id = req.query.loginid;

        console.log("-----------------------------------------------------------------",id);
        conn.query(db_sql.cart_select_one, id, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;
                } else {
                    console.log(result);
                    goto.go(req,res,{ 'centerpage': 'useritem/cart', 'item': result });
                    // res.render('index', { 'centerpage': 'cust/detail', 'cust': result[0] });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
        // res.render('index',{'centerpage':'item/item2'});
    })
    .get("/detail",(req,res)=>{
        let id = req.query.id;
        conn = db_connect.getConnection();

        conn.query(db_sql.item_select_one, id, function (e, result, fields) {
            try {
                if (e) {
                    console.log('Select Error');
                    throw e;
                } else {
                    console.log(result);
                    goto.go(req,res,{ 'centerpage': 'useritem/detail', 'item': result[0] });
                    // res.render('index', { 'centerpage': 'cust/detail', 'cust': result[0] });
                }
            } catch (e) {
                console.log(e);
            } finally {
                db_connect.close(conn);
            }
        });
    })
    .post("/addcart",(req,res)=>{
        let count = req.body.count;
        let userid = req.body.userid;
        let itemid = req.body.itemid;
        console.log(count);
        console.log(userid);
        console.log(itemid);
        //데이터베이스에
        // 사용자id, 상품id, 상품이름, 상품금액, 상품총금액,개수, 날짜

        goto.go(req,res,{'centerpage':'useritem/cart'});  

    });

module.exports = router;