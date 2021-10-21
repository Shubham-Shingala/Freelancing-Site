const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
let user = require('../models/user');
const config=require('../config');


const route = express.Router();

function comparePassword(password,hashPassword,flagCallback){
    bcrypt.compare(password,hashPassword,(err,isMatch)=>{
        if(err){
            console.log(err);
        }
        return flagCallback(isMatch);
    })
}



route.post("/register", (req, res, next) => {
    let Obj = req.body;
    if(!Obj.Email){
        return res.json({status:'error',error:'email required'})
    }
    const ps = bcrypt.hash(Obj.Password, 10, (err, pass) => {
        if (err) {
            return next(err);
        }
        user.create({
            Email: Obj.Email,
            FirstName: Obj.FirstName,
            LastName: Obj.LastName,
            Password: pass,
            Role: Obj.Role,
            profileImg:Obj.profileImg
        }, (err, data) => {
            if(err){
                if (err.code==11000) {
                    // console.log(Obj.Email);
                    return res.json({status:'error',error:'email already in use'});
                }
                else
                return next(err);
            }
            else
            return res.json({status:'ok'})
        })
    });

})

route.post('/login',(req,res)=>{
    user.findOne({Email:req.body.Email},(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            if(!data){
            return res.json({status:'error',error:'invalid email/password'})
            }
            comparePassword(req.body.Password,data.Password,(flag)=>{
                if(flag){
                    const token=jwt.sign({
                        id:data._id,
                        // Email:data.Email,
                        // Role:data.Role
                    },config.TOKEN_SECRET)
                    return res.json({status:'ok',data:token})
                }
                else{
                    return res.json({status:'error',error:'invalid email/password'});
                }
            });
            
        }
    })
})
route.post('/changePassword',(req,res)=>{
    const {Password,token}=req.body
    try{
        const Obj= jwt.verify(token,config.TOKEN_SECRET)
        const _id=Obj.id;
        user.findById(_id,(err,data)=>{
            if(err){
                console.log(err);
            }
            if(data){
                const flag=comparePassword(Password,data.Password);
                if(flag){
                    // const hashPassword=bcrypt.hash(Password);
                    // user.updateOne({_id}),{
                    // $set:{password:hashPassword}
                    // }
                }
                else
                {
                    res.json({status:'error',error:'invalid password'});
                }
            }
        })
        
    }
    catch(error){
        return res.json({status:'error',error:"invalid token"})
    }
})
route.post('/loggedUser',(req,res)=>{
    try{
        const Obj= jwt.verify(req.body.token,config.TOKEN_SECRET)
        const _id=Obj.id;
        user.findById(_id,(err,data)=>{
            if(err){
                console.log(err);
            }
            if(data){
                return res.json({status:'ok',data:data})

            }
        });
    }
    catch(err){
        return res.json({status:'error',error:"invalid token"})
    }
})

route.post('/addDescription',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{Description:req.body.description},(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})

route.post('/addEducation',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{
        CollegeCountry:req.body.collegeCountry,
        CollegeName:req.body.collegeName,
        Degree:req.body.degree,
        Branch:req.body.branch,
        YearOfGraduation:req.body.yearOfGraduation
    },(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})

route.post('/addCertificate',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{
        Certificate:req.body.certificate,
        CertificateFrom:req.body.certificateFrom,
        YearOfCertificate:req.body.yearOfCertificate
    },(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})

route.post('/addProfileImg',(req,res)=>{
    user.findByIdAndUpdate(req.body.id,{
        profileImg:req.body.fileName
    },(err,data)=>{
        if(err){
            console.log(err);
        }
    })
})

module.exports = route;