const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String,unique:true },
  productImage:{type:String,required:false},
  password: { type: String },
  token: { type: String },
  session:{}
},//{ typeKey: '$type' }
);

module.exports = mongoose.model("authentication", userSchema);