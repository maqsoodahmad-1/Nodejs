const mongoose = require("mongoose")
exports.connect = () => {
    //connecting to the database
    mongoose.connect("mongodb+srv://maqsodahmad:talimaqsood@cluster0.1gohczx.mongodb.net/FoodApp?retryWrites=true&w=majority",{
    
    })

    .then(()=>{
        console.log("Successfully connected to the database");
    })
    .catch((err)=>{
        console.log('Database connection failed ');
        console.error(err);
        process.exit(1);
    });
};