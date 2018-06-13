const jwt = require('jsonwebtoken');
const Todo = require('../models/todos')

function isAuthorizedUser(req, res, next) {
    if(req.params.id){
        const id = req.params.id
        const currUserId = req.user.id
        Todo.findById({_id:id})
        .then(todo=>{
            if(todo.userId.equals(currUserId)){
                next()
            }else{
                res.status(400).json({error: "Not Authorized user"})
            }
        })
        .catch(err=>{
            next(err)
        });
    }else{
        res.sendStatus(500);
    }
}

module.exports = isAuthorizedUser;