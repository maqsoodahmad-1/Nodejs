const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const create_session = require('../middleware/session')
const User = require('../model/user')
let session = require("express-session");
const auth = require('../middleware/auth');
const upload = require('../middleware/imageUpload')

router.post('/register', upload.single('ProductImage'), async (req, res) => {
    //register logic goes here 
    try {
        console.log(req.file);
        const filepath = req.file.path;
        const { first_name, last_name, email, password } = req.body;
        console.log(first_name, last_name, email, password);
        //validate user input
        if (!(first_name && last_name && email && password )) {
            return res.send('All inputs are required')
        }   
        //check if user already exists
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send("user with this email already exists:Please Login")
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
router.post('/login', async (req, res) => {
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
            // creating a session
            session = req.session;
            session.user_id = req.body.email;
         if(user.session = session) {
            // create token
            const token = jwt.sign({ user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h"
                })
            user.token = token
            return res.status(201).send(user)
         } else {
            return res.status.send("Session is required");
         }
        }
        return res.status.apply(400).send("Invalid credentials");
    }
    catch (err) {
        console.log(err);
    }
})

//get request 
router.get('/get/:name', /*auth,*/   async(req, res) => {
    const name = req.params.email
   session = req.session;
   session.user_id = req.body.email;
   console.log(session.user_id)
   if (session.user_id) {
       const user = await User.find({name}).select("first_name last_name email _id");
       console.log(user);
       res.send(user)

   } else {
       res.status(404).send("Bad request");
   }
})

//updating the data 
router.patch('/update/:email', auth, async(req,res) => {
    const email = req.params.email;
    const name  = req.body.name;
    console.log(email);
    session = req.session;
    console.log(session);
    session.user_id = req.params.email ;
    console.log(session.user_id);
    if (session.user_id) {
        const exist = await User.findOne({email});
        if(!exist){
            return res.status(404).send({message:"User not found with this email"})
        } else{
        const response = await User.updateOne({email}, {$set:{first_name:name}});
        const user = await User.findOne({email}).select("first_name last_name, email, _id ")
        console.log(response);
        res.send(user)
        }
    } else {
        res.status(404).send("Bad request");
    }
})

//Delete request for the user
router.delete('/delete/:email', auth, async(req,res) => {
    const email = req.params.email;
    session = req.session;
    session.user_id = req.params.email;
    console.log(session.user_id)
    if(session.user_id){
        const exists = await User.findOne({email});
        if(!exists) {
            return res.status(404).send({ message:"No user exists with the given email address" })
        } else {
            await User.deleteOne({email});
            return res.send({message:"Document was Deleted Successfully"});
        }
    }
    else {
        return res.send('Bad request');
    }
})

//Welcome Route that requires the authorization
router.post('/welcome', /*cors(),*/ auth, (req, res) => {
    res.status(200).send("Welcome This is the safe Route🤓🤓")
})
module.exports = router;

