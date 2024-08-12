const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 




router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'item/center'});
    })
    .get("/item1",(req,res)=>{
        let itemData = [
            {'id':100,'name':'바지','price':10000,'imgname':'a1.jpg','regdate':'2024-08-09'},
            {'id':101,'name':'바지','price':20000,'imgname':'a2.jpg','regdate':'2024-08-09'},
            {'id':102,'name':'바지','price':30000,'imgname':'a3.jpg','regdate':'2024-08-09'},
            {'id':103,'name':'바지','price':40000,'imgname':'a4.jpg','regdate':'2024-08-09'},
            {'id':104,'name':'바지','price':50000,'imgname':'a5.jpg','regdate':'2024-08-09'},
        ]
        res.render('index',{'centerpage':'item/item1','item':itemData});
    })
    .get("/item2",(req,res)=>{  
        res.render('index',{'centerpage':'item/item2'});
    })
    .get("/item3",(req,res)=>{  
        res.render('index',{'centerpage':'item/item3'});
    })

module.exports = router;