const User = require('../models/users');
const jwt = require('jsonwebtoken');


module.exports = {
    registerUser : (req,res)=>{
        const {username,password,email} = req.body
        let user = new User({
            username,
            password,
            email
        })
        user.save()
        .then(function(result){
            let user = {
                id : result._id,
                username : result.username,
                email : result.email
            }
            res.status(201).json({message: "create user success", user})
        })
        .catch(function(err){
            res.status(500).json({error : err})
        })
    },
    loginUser : (req,res)=>{
        const {username,password} = req.body
        User.findOne({username}).select('+password')
        .then(function(user){
            if(user){
                user.comparePassword(password,function(err,isMatch){
                    if(err) res.status(500).json({error: err});
                    if(isMatch){
                        //get token from jwt
                        let token = jwt.sign({id: user._id, username: user.username},process.env.SECRET_KEY,{
                            expiresIn:86400 //expires in 24 hours
                        })
                        res.status(200).json({auth: true, token});
                    }else{
                        res.status(401).json({message: 'Incorrect username/password',auth: false, token : null});
                    }
                })
            }else{
                res.status(404).json({message: 'username Not Found', auth: false, token: null});
            }
        })
        .catch(function(err){
            res.status(500).json({error: err});
        })
    },
    showAllUsers : (req,res)=>{
        User.find()
        .then(function(users){
            res.status(200).json({message: 'retrieve user success', users})
        })
        .catch(function(err){
            res.status(500).json({error: err});
        })
    }
}