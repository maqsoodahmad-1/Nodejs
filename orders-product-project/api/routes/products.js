const express = require('express')
const router = express.Router();

router.get('/',(req, res, next) => {
    res.status(200).json({
        message:"Handling get request to the /products"
    })
})

router.post('/',(req, res, next) => {
    res.status(200).json({
        message:"Handling get request to the /products"
    })
})

router.patch('/',(req, res, next) => {
    res.status(200).json({
        message:"Handling patch request to the /products"
    })
})
router.delete('/',(req, res, next) => {
    res.status(200).json({
        message:"Handling delete request to the /products"
    })
})
module.exports = router;