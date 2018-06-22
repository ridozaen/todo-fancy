const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.get('/', (req,res)=>{
//     res.send('login ok')
// })
router.post('/', userController.loginUser);
router.post('/viafb', userController.loginViaFb);

module.exports = router;