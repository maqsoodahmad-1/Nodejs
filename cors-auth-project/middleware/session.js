// const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
const sessions = require('express-session');
const sessionOptions = sessions({
    store:MongoStore.create({
        mongoUrl:process.env.MONGO_URI,
        ttl:1000*60,
        collectionName:'Sessio',
        autoRemove:'native'
    }),
    secret: process.env.secret,
    saveUninitialized: true,
    resave: false,
   
})
module.exports = sessionOptions;
