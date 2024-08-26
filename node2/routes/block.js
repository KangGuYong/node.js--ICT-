const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 
var goto = require('../util/goto');


router
    .get("/",(req,res)=>{
        goto.go(req,res,{'centerpage':'block/center'});  
        // res.render('index',{'centerpage':'html/center'});
    })
    .get("/block1",(req,res)=>{
        goto.go(req,res,{'centerpage':'block/block1'}); 
    })
    .get("/block2",(req,res)=>{  
        goto.go(req,res,{'centerpage':'block/block2'}); 
    })
    .get("/block3",(req,res)=>{  
        goto.go(req,res,{'centerpage':'block/block3'}); 
    })

module.exports = router;