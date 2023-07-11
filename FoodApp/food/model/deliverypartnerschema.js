const mongoose = require('mongoose');
const DeliverySchema = new mongoose.Schema({
    dishName:{type: String,required:true},
    dishType:{type: String,required:true},
})
mongoose.set('strictQuery',true);

module.exports = mongoose.model("students", DeliverySchema);


           