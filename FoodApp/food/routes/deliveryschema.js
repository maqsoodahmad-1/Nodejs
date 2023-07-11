const express = require('express');
const router = express.Router();
const deliverySc = require('../model/deliverypartnerschema')
router.post('/delivery', async(req,res)=>{
    console.log(`post ${req}`);
    try{
            const dishName =  req.body.dishName;
            const dishType =  req.body.dishType;
           
            // console.log(`post ${firstname,email,lastname,id,contact,institutename,subject,complain,instituteContact}`);

            console.log(dishName,dishType);
            if(!(dishName && dishType)){
                return res.send("All the feilds are required");
            }

            const deliiverySchmea = await deliverySc.create({
                dishName:dishName,
                dishType:dishType
            })
        return res.status(201).json(deliiverySchmea);
    }catch(err){
        console.log(err);
    }
})
router.get('/get',  async(req, res) => {
    try{
        const name = req.body.name
        //    session = req.session;
        
        //    session.user_id = req.body.email;
        //    console.log(session.user_id)
        
        const user = await deliverySc.find({name});
        console.log(user);
        res.send(user)
    } catch(err){
        console.log(err);
        res.status(403).send(err);
    }

})
module.exports = router;

