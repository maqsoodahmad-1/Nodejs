const mongoose = require("mongoose")
exports.connect = () => {
    //connecting to the database
    mongoose.connect("",{
    
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
