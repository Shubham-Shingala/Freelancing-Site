const express = require('express');
const route = express.Router();
let bid = require('../models/Bid');

//place bid
route.post('/placeBid',(req,res)=>{
    bid.create(req.body,(err,data)=>{
        if(err){console.log(err)}
        if(data){
            return res.json({status:'ok'});
        }
    })
})

//get all bid of project
route.get('/getBidOfProject/:id',(req,res)=>{
    bid.find({project:req.params.id})
    .populate('BidUser')
    .exec((err,data)=>{
        if(err){console.log(err)}
        if(data){
            return res.json({status:'ok',data:data});
        }
    })
})

//get hired bid of project
route.get('/getBidOfHiredProject/:id',(req,res)=>{
    bid.find({project:req.params.id,Status:'Hired'})
    .populate('BidUser')
    .exec((err,data)=>{
        if(err){console.log(err)}
        if(data){
            return res.json({status:'ok',data:data});
        }
    })
})

module.exports=route;