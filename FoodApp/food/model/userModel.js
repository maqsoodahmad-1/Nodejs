const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    name:{type: String,required:true},
    password:{type: String,required:true},
})
mongoose.set('strictQuery',true);

module.exports = mongoose.model("users", userSchema);
