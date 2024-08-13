const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

var goto = require('../util/goto');



router
    .get("/",(req,res)=>{  
        goto.go(req,res,{ 'centerpage': 'chart/center' });
        // res.render('index',{'centerpage':'chart/center'});
    })
    .get("/chart1",(req,res)=>{  
        goto.go(req,res,{ 'centerpage': 'chart/chart1' });
        // res.render('index',{'centerpage':'chart/chart1'});
    })
    .get("/chart2",(req,res)=>{  
        goto.go(req,res,{ 'centerpage': 'chart/chart2' });
        // res.render('index',{'centerpage':'chart/chart2'});
    })
    .get("/chart3",(req,res)=>{  
        goto.go(req,res,{ 'centerpage': 'chart/chart3' });
        // res.render('index',{'centerpage':'chart/chart3'});
    })

module.exports = router;