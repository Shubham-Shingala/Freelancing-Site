const mongoose = require('mongoose');
const schema=mongoose.Schema;

let Bid=new schema({
    BidUser:{type:schema.Types.ObjectId,ref:'user'},
    project:{type:schema.Types.String,ref:'project'},
    BidAmount:{type:Number},
    DeliveredDays:{type:Number},
    Proposal:{type:String},
    Status:{type:String,default:"not Hired"}
},{
    collection:"bids"
})
module.exports=mongoose.model('bid',Bid);
