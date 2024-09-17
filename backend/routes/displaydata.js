const express = require('express');
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {
        res.send([global.food_items, global.food_category]) //getting food data from db file
    } catch (error) {
        res.send("Server Error")
    }
})

module.exports = router;
