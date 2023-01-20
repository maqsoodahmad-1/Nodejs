const mongoose = require("mongoose");
const {roles} =require('../utills/constants')
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String,unique:true },
  // productImage:{type:String,required:false},
  contactNo:{type: Number,unique: true ,required: true},
  address:{
    state:{type:String,required:true},
    District:{type:String,required:true},
    pincode:{type:Number,required:true,default:null}
  },
  password: {type: String,required:true },
  cofirmPassword:{type:String,required:false},
  role:{
    type:String,
    enum:[roles.admin,roles.institute,roles.student],
    default :roles.student,
  },
  token: { type: String },
  session:{}
},//{ typeKey: '$type' }
);
mongoose.set('strictQuery', true);

module.exports = mongoose.model("students", userSchema);