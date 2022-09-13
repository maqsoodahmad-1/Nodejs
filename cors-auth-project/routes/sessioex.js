const express = require('express');
const router = express.Router();

router.get('/get', (req,res,next) => {
    req.session.user = {
        uuid: '12234-2345-2323423'
    }
    req.session.save(err => {
        if(err){
            console.log(err);
        } else {
            res.send(req.session.user)
        }
    });
})
module.exports = router;