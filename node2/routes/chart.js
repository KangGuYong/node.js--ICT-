const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 




router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'chart/center'});
    })
    .get("/chart1",(req,res)=>{  
        res.render('index',{'centerpage':'chart/chart1'});
    })
    .get("/chart2",(req,res)=>{  
        res.render('index',{'centerpage':'chart/chart2'});
    })
    .get("/chart3",(req,res)=>{  
        res.render('index',{'centerpage':'chart/chart3'});
    })

module.exports = router;