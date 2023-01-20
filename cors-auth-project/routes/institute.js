const express =  require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const instituteSchema = require('../model/institute');
const { route } = require('./complains');

router.post('/register',async(req,res) => {
    try{
        const {instituteName,email,contact,address,password,confirmpassword } = req.body;
        console.log(instituteName,email,contact,address,password);
        if(!(instituteName&&email&&contact&&address&&password&&confirmpassword)){
            return res.send("All the feilds required");
        }
        if(confirmpassword!=password) {
            return res.send("Password must match");
        }
        const oldInstitue = await instituteSchema.findOne({email});
        if(oldInstitue){
            return res.send("Institute with this email already exits");
        }
        //hash password
        const encryptedPassword = await bcrypt.hash(password, 10);
        const institute = await instituteSchema.create({
            instituteName:instituteName,
            email:email,
            contact:contact,
            address:address,
            password:encryptedPassword,
        })
        return res.status(201).json(institute);
    }catch(err){
        console.log(err)
    }
})

//Institute login
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

module.exports= router;