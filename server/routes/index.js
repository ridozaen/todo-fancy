const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('home page API todo');
})

module.exports = router;