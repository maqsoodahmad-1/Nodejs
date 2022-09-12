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
const qr = require('qrcode');
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);

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
        cb(null,falses);//rejects file
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
            // session = req.session;
            // session.user_id = req.body.email;
            // user.session = session;
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
    origin: 'localhost:3001',
    optionSuccessStatus: 200 //for some legacy browser
}
//Welcome Route that requires the authentication
app.post('/user/welcome', cors(), auth, (req, res) => {
    res.status(200).send("Welcome This is the safe Route🤓🤓")
})

//get request 
app.get('/user/get/:email', async(req, res) => {
     const email = req.params.email
    session = req.session;
    session.user_id = req.body.email;
    if (session.user_id) {
        const user = await User.findOne({email});
        console.log(user);
        res.send(user)

    } else {
        res.status(404).send("Bad request");
    }
})

//put request updating the data 
app.put('/user/update/:email',async(req,res) => {
    const email = req.params.email;
    const name  = req.body.name;
    console.log(email);
    console.log(name);

    session = req.session;
    session.user_id = req.params.email ;
    if (session.user_id) {
        const response = await User.updateOne({email}, {$set:{first_name:name}});
        const user = await User.findOne({email})
        console.log(response);
        res.send(user)

    } else {
        res.status(404).send("Bad request");
    }
})

//Delete request for the user
app.delete('/user/delete/:email',async(req,res) => {
    const email = req.params.email;
    session = req.session;
    session.user_id = req.params.email;
    console.log(session.user_id)
    if(session.user_id){
        const status = await User.deleteOne({email});
        if(status.acknowledged === true && status.deletedCount===1){

            return res.status(201).send('Document was deleted successfully') ;
        }
        else{
            return res.send("no document exists")
        }
    }
    else {
        return res.send('Bad request');
    }
})
//Qr code logic
app.get('/', (req, res) => {
    res.render("index");
})

app.post('/scan', async(req, res) => {
    const url = req.body.da;
    console.log(url);
    if(url.length === 0){
        return res.send("Empty Data");
    }
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    qr.toDataURL(url,(err,src) =>{
        if(err) {
            return res.send("Error occured")
        }
        return res.render('scan ', {src});
    })
    
})
module.exports = app;
