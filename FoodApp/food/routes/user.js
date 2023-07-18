const express = require('express');
const router = express.Router();
const userSchema = require('../model/userModel');
const foodSc = require('../model/foodSc');

//Posting the data
router.post('/delivery', async(req,res)=>{
    console.log(`post ${req}`);
    try{
            const name = req.body.name;
            const password =  req.body.password;
           
            // console.log(`post ${firstname,email,lastname,id,contact,institutename,subject,complain,instituteContact}`);

            console.log(name,password);
            if(!(name && password)){
                return res.send("All the feilds are required");
            }

            const user = await userSchema.create({
              name:name,
              password:password
            })
        return res.status(201).json(user);
    }catch(err){
        console.log(err);
    }
})

//Getting the data
router.get('/get/',  async(req, res) => {
    try{
        const name = req.params.name
        //    session = req.session;
        
        //    session.user_id = req.body.email;
        //    console.log(session.user_id)
        
        const user = await userSchema.find({});
        console.log(user);
        res.send(user)
    } catch(err){
        console.log(err);
        res.status(403).send(err);
    }

})

//Updating the data
router.patch('/update/:id', async(req,res) => {
    const _id = req.params.id;
    console.log(_id);
    const  {update} = req.body;
        const exist = await User.findOne({_id});
        if(!exist){
            return res.status(404).send({message:"User not found with this id"})
        } else {
        const response = await foodSc.findOneAndUpdate({_id},{update}, {
            new:true,
            upsert: true
        });
        console.log(response);
        res.send(response)
        }
})

module.exports = router;

