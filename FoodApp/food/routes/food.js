const express = require('express');
const router = express.Router();
const foodSchema = require('../model/foodSc')
router.post('/post', async(req,res)=>{
    console.log(`post ${req}`);
    try{
        const {name,type, category, available, location,duration, rating, description, shop} = req.body;
          console.log(name,type, category, available, location,duration, rating, description ,shop);
            const food = await foodSchema.create({
              name:name,
              type:type,
              category:category,
              available:available,
              location:location,
              duration:duration,
              rating:rating,
              description:description,
              shop:shop
            },{new:true})
        return res.status(201).json(food);
    }catch(err){
        console.log(err);
    }
})
router.get('/get',  async(req, res) => {
    try{
        // const name = req.params.name
        //    session = req.session;
        
        //    session.user_id = req.body.email;
        //    console.log(session.user_id)
        
        const food = await foodSchema.find({});
        console.log(food);
        res.send(food)
    } catch(err){
        console.log(err);
        res.status(403).send(err);
    }

})

//Updating the data
router.patch('/update/:id', async(req,res) => {
    const _id = req.params.id;
    console.log(_id);
    const {name,type, category, available, location,duration, rating, description, shop} = req.body;
    // console.log(update);
        const exist = await foodSchema.findOne({_id});
        if(!exist){
            return res.status(404).send({message:"User not found with this id"})
        } else {
        const response = await foodSchema.updateOne({_id}, {$set:{
            name:name,
            type:type,
            category:category,
            available:available,
            location:location,
            duration:duration,
            rating:rating,
            description:description,
            shop:shop
        },
        new:true});
        console.log(response);
        if(response.acknowledged === true){
            const food = await foodSchema.findById({_id})
            return res.send(food)
        } else {
            return res.send("Failed to update")
        }
}
})
module.exports = router;

