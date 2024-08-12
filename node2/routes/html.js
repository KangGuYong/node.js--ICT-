const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'html/center'});
    })
    .get("/html1",(req,res)=>{  
        res.render('index',{'centerpage':'html/html1'});
    })
    .get("/html2",(req,res)=>{  
        res.render('index',{'centerpage':'html/html2'});
    })
    .get("/html3",(req,res)=>{  
        res.render('index',{'centerpage':'html/html3'});
    })

module.exports = router;