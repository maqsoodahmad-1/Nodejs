const mongoose = requiee('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{ type :String, default: null },
    price:{ type:Number, required:true },
    
})