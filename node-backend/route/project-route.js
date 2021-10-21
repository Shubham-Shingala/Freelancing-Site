const express = require('express');
const path=require('path');

const route = express.Router();
let project = require('../models/project');

//get all project
route.get('/', (req, res, next) => {
    project.find((error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data);
        }
    })
})
//create project
route.post('/create', (req, res, next) => {
    project.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    })
})
// Get single project
route.get('/read/:id', (req, res, next) => {
    project.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json({status:'ok',data:data})
        }
    })
})

route.post('/updateBid/:id',(req,res,next)=>{
    project.findByIdAndUpdate(req.params.id,{
        NumberOfBids:req.body.bid
    },(error, data) => {
        console.log(data);
        if (error) {
            return next(error);
        } else {
            return res.json({status:'ok',data:data})
        }
    })
})

//update project status
route.post('/updateProjectStatus/:id',(req,res)=>{
    project.findOneAndUpdate(req.params.id,{
        Status:req.body.status,
        hiredUser:req.body.userId
    },(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            return res.json({status:'ok',data:data})
        }
    })
})

// Update project
route.put('/update/:id', (req, res, next) => {
    project.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Data updated successfully')
        }
    })
})

// Delete employee
route.delete('/delete/:id', (req, res, next) => {
    project.findOneAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

//find projects of user
route.get('/findProjectsOfUser/:userId',(req,res,next)=>{
    // console.log(req.params.userId);
    project.find({_User:req.params.userId},(err,data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.json({status:'ok',data:data})
        }
    })
})

route.post('/file-upload',(req, res,next)=> {

    let file = req['files'].file;
    let uploadPath=path.join("../../Freelancer/Freelancer/src/assets","uploads")+"/"+file.name;
    file.mv(uploadPath,(err)=>{
        if(err){
            return next(err);
        }
        else{
            return res.json({status:'ok',data:'file uploaded'});
        }
        })
  });
route.post('/projectUpload',(req, res,next)=> {

    let file = req['files'].file;
    let uploadPath=path.join(__dirname,"uploads")+"/"+file.name;
    file.mv(uploadPath,(err)=>{
        if(err){
            return next(err);
        }
        else{
            return res.json({status:'ok',data:'file uploaded'});
        }
        })
  });

module.exports = route;