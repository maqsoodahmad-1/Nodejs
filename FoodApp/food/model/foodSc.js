const mongoose = require('mongoose');
const foodSchema= new mongoose.Schema({
    name:{type: String,required:false},
    type:{type: String,required:false},
    category:{type: String,required:false},
    available:{type: String,required:false},
    location:{type: String,required:false},
    duration:{type: String,required:false},
    rating:{type: String,required:false},
    description:{type: String,required:false},
    shop:{type: String,required:false},

})
mongoose.set('strictQuery',false);

module.exports = mongoose.model("foods", foodSchema);