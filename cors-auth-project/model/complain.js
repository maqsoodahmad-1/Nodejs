const mongoose = require('mongoose');
const ComplainSchema  = new mongoose.Schema({
    studentname:{type:String,required:true},
    contact:{type:Number,required:true},
    InstituteName:{type:String,required:true},
    Subject:{type:String,required:true},
    Complain:{type:String,required:true,maxLength:100}

})
module.exports = mongoose.model('complains',ComplainSchema);