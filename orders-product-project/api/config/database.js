const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI
exports.connect = () =>{
    mongoose.connect(MONGO_URI,{})
    .then(() => {
        console.log('successfully connected to the database');
    })
    .catch((err) => {
        console.error(`can't connect ot the database because ${err}`)
        process.exit(1);
    })
}