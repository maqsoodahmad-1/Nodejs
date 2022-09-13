// const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const sessions = require('express-session');
const sessionOptions = sessions({
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        ttl:1000*60,
        collectionName:'Sessio',
        autoRemove:'native'
    })
   
})
module.exports = sessionOptions;
