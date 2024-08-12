const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 




router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'cust/center'});
    })
    .get("/cust1",(req,res)=>{
        let custData = [
            {'id':'id:01','pwd':'pwd01','name':'강구용1','acc':'1111'},
            {'id':'id:02','pwd':'pwd02','name':'강구용2','acc':'2222'},
            {'id':'id:03','pwd':'pwd03','name':'강구용3','acc':'3333'},
            {'id':'id:04','pwd':'pwd04','name':'강구용4','acc':'4444'},
            {'id':'id:05','pwd':'pwd05','name':'강구용5','acc':'5555'},
        ];  
        res.render('index',{'centerpage':'cust/cust1','custs':custData});
    })
    .get("/cust2",(req,res)=>{  
        res.render('index',{'centerpage':'cust/cust2'});
    })
    .get("/cust3",(req,res)=>{  
        res.render('index',{'centerpage':'cust/cust3'});
    })

module.exports = router;