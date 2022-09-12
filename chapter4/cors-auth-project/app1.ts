require('./config/database').connect();
require('dotenv').connect()
const express = require('express')
const app = express()
const User = require('./model/user')
app.use(express.json({ limit: "50mb" }));
//Register Route
app.post('/user/register', async (req, res) => {
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
    }catch(err){
        console.log(err);
    }
})

type user= {
name:string,
}