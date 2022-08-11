var mongoose = require('mongoose');
//var userNewUrlParser = require('userNewUrlParser');
const URI = "mongodb://localhost:27107/authdb"
mongoose.connect(URI, {useNewUrlParser: true});
var conn = mongoose.connection;
conn.on('connected',function() {
        console.log('Database is connected sucessfully');
})
conn.on('disconnected', function() {
    console.log('Databse is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error'));
module.exports =  conn;