const mongoose = require('mongoose')

const MONGO_URI  = process.env.MONGO_URI;
console.log(MONGO_URI);
exports.connect = () => {
    //connecting to the database
    mongoose.connect(MONGO_URI,{
    
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