const express = require('express');
const router = express.Router();
const ComplainSc = require('../model/complain')

router.post('/complain', async(req,res)=>{
    try{
            const {studentname,contact,InstituteName,Subject,Complain} = req.body;
            console.log(studentname,contact,InstituteName,Subject,Complain);
            if(!(studentname&&contact&&InstituteName&&Subject&&Complain)){
                return res.send("All the feilds are required");
            }

            const complain = await ComplainSc.create({
                studentname:studentname,
                contact:contact,
                InstituteName:InstituteName,
                Subject:Subject,
                Complain:Complain
            })
        return res.status(201).json(complain);
    }catch(err){
        console.log(err);
    }
})

//Get Request

//get request 
router.get('/get', /*auth,*/   async(req, res) => {
    // const name = req.params;
//    session = req.session;
//    session.user_id = req.body.email;
//    console.log(session.user_id)
   if (session.user_id=1) {
       const complain = await ComplainSc.find();
    //    .select("first_name last_name email _id");
       console.log(complain);
       res.send(complain)

   } else {
       res.status(404).send("Bad request");
   }
})

module.exports = router;