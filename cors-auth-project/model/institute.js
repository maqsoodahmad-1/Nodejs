const mongoose = require('mongoose');
const instituteSchema = new mongoose.Schema(
    {
        instituteName:{type:String, required:true},
        email:{type:String, required: true},
        contact:{type:Number,required:true},
        address:{
            state:{type:String, required:true},
            city:{type:String,required:true},
            pincode:{type:Number, required:true}
        },
        password:{type:String,required:true}
    }
)
module.exports= new mongoose.model("Institute",instituteSchema);