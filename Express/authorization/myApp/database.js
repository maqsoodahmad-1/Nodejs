var mongoose = require('mongoose');
const URI = "http://127.0.0.1:8080"
mongoose.connect, {URI, userNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected',function() {
        console.log('Database is connected sucessfully');
})
conn.on('disconnected', function() {
    console.log('Databse is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error'));
module.exports =  conn;