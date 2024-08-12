const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser'); 

router
    .get("/",(req,res)=>{  
        res.render('index',{'centerpage':'geo/center'});
    })
    .get("/geo1",(req,res)=>{  
        res.render('index',{'centerpage':'geo/geo1'});
    })
    .get("/geo2",(req,res)=>{  
        res.render('index',{'centerpage':'geo/geo2'});
    })
    .get("/geo3",(req,res)=>{  
        res.render('index',{'centerpage':'geo/geo3'});
    })

module.exports = router;