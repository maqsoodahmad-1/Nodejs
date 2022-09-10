require("dotenv").config();
require('./config/database').connect();
const auth = require('./middleware/auth')
const { application } = require("express");
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cors = require('cors')
const User = require('./model/user')
const multer = require('multer')
const sessions = require('express-session');
let session = require("express-session");

app.use('/uploads',express.static('uploads'))

const Storage = multer.diskStorage({
destination: function(req, file, cb){
    cb(null,'uploads/');
},
filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
}
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype ==='application/octet-stream' || file.mimetype === 'application/jpeg'
    || file.mimetype === 'application/png' ||file.mimetype ==='application/pdf' || file.mimetype ==='application/jpg' ) {
        cb(null, true);//Accepts file
    } else {
        cb(null,false);//rejects file
    }
}

const upload = multer({ storage:Storage , limits:{
    fileSize:1024 * 1024 *5 
},
fileFilter:fileFilter
})//specifies a folder where multer stores the files

app.use(cors());
app.use(express.json({ limit: "50mb" }));
const hour = process.env.hour

app.use(sessions({
    secret: process.env.secret,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
    resave: false
}))

//Register Route
app.post('/user/register', upload.single('productImage'), async (req, res) => {
    //register logic goes here 
    try {
        console.log(req.file);
        const filepath = req.file.path;
        const { first_name, last_name, email, password } = req.body;
        console.log(first_name, last_name, email, password);
        //validate user input
        if (!(first_name && last_name && email && password)) {
            return res.send('All inputs are required')
        }
        //check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send("user already exists:Please Login")
        }
        session = req.session;
        session.user_id = req.body.email;
        console.log(req.session);
        const encryptedPassword = await bcrypt.hash(password, 10);
        //create user 
        const user = await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            productImage:filepath,
            password: encryptedPassword,
            session: session

        })
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        );
        user.token = token
        console.log(token);
        return res.status(201).json(user)
    } catch (err) {
        console.log(err);
    }
})

//Login Route
app.post('/user/login', async (req, res) => {
    //Login logioc goes here
    try {
        const { email, password } = req.body;
        //validate for user input
        if (!(email && password)) {
            return res.status(400).send("Both email and password are required");
        }
        //validate if user exists in database
        const user = await User.findOne({ email });
        if (user && bcrypt.compare(password, user.password)) {
            //creating a session
            session = req.session;
            session.user_id = req.body.email;
            user.session = session;
            //create token
            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h"
                })
            user.token = token
            return res.status(201).send(user)
        }
        return res.status.apply(400).send("Invalid credentials");
    }
    catch (err) {
        console.log(err);
    }
})

//setting option for the cors
const corsOption = {
    origin: 'http://example.com',
    optionSuccessStatus: 200 //for some legacy browser
}
//Welcome Route that requires the authentication
app.post('/user/welcome', cors(), auth, (req, res) => {
    res.status(200).send("Welcome This is the safe Route🤓🤓")
})

//get request 
app.get('/user/get', (req, res) => {
    session = req.session;
    // console.log(user._id);
    if (session.user_id) {
        res.status(201).send('This route is maintained by the session');
    } else {
        res.status(404).send("Bad request");
    }
})
module.exports = app;
