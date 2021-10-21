const mongoose = require('mongoose');
const schema=mongoose.Schema;

let Project=new schema({
    _id:{type:String},
    Name:{type:String},
    Description:{type:String},
    FilePath:{type:String},
    Category:{type:String},
    MinBudget:{type:Number},
    MaxBudget:{type:Number},
    _User:{type:schema.Types.ObjectId,ref:'user'},
    Freelancer:{type:schema.Types.ObjectId,ref:'user'},
    Status:{type:String},
    Duration:{type:Number},
    ProjectStartingTime:{type:Date},
    ProjectPostTime:{type:Date},
    NumberOfBids:{type:Number,default:0},
    hiredUser:{type:schema.Types.ObjectId,ref:'user'}
},{
    collection:"projects"
})

module.exports=mongoose.model('project',Project);