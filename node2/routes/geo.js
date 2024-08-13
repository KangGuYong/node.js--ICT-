const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 
var goto = require('../util/goto');

router
    .get("/",(req,res)=>{  
        goto.go(req,res,{'centerpage':'geo/center'});
        // res.render('index',{'centerpage':'geo/center'});
    })
    .get("/geo1",(req,res)=>{
        goto.go(req,res,{'centerpage':'geo/geo3'}); 
        // res.render('index',{'centerpage':'geo/geo1'});
    })
    .get("/geo2",(req,res)=>{
        goto.go(req,res,{'centerpage':'geo/geo2'});
        // res.render('index',{'centerpage':'geo/geo2'});
    })
    .get("/geo3",(req,res)=>{
        goto.go(req,res,{'centerpage':'geo/geo3'});
        // res.render('index',{'centerpage':'geo/geo3'});
    })

module.exports = router;