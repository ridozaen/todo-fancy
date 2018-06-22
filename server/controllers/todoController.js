const Todo = require('../models/todos');

module.exports = {
    addTodo : (req,res)=>{
        const task = req.body.task;
        const userId = req.user.id;
        let todo = new Todo({
            task,
            isDone : false,
            userId
        })
        todo.save()
        .then(function(result){
            res.status(201).json({message: 'Add todo success', result})
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
    },
    showTodo : (req,res)=>{
        const userId  = req.user.id;
        Todo.find({userId})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(todos=>{
            res.status(200).json({message: 'retrieve success', todos})
        })
        .catch(err=>{
            res.status(500).json({error:err})
        })
    },
    updateTodo : (req,res)=>{
        const id = req.params.id;
        const task = req.body.task;
        Todo.findById({_id : id})
        .then(todo=>{
            if (todo.isDone){
                res.status(400).json({message: "Task status is done, cannot be modified", todo})
            }else{
                Todo.updateOne({_id:id},{$set : {task}})
                .then(result=>{
                    res.status(200).json({message: "Task updated success!", result})
                })
                .catch(err=>{
                    res.status(500).json({error:err})
                })
            }   
        })
        .catch(err=>{
            res.status(500).json({error: err});
        })
    },
    doneTodo : (req,res)=>{
        const id = req.params.id
        const isDone = req.body.isDone
        Todo.findByIdAndUpdate(
            {_id : id},
        {$set : {isDone}})
        .then(result=>{
            res.status(200).json({message: "Task Done!", result})
        })
        .catch(err=>{
            res.status(500).json({error: err});
        })
    },
    deleteTodo : (req,res)=>{
        const id = req.params.id
        Todo.findByIdAndRemove({_id:id})
        .then(result=>{
            res.status(200).json({message:"Delete Task Done", result})
        })
        .catch(err=>{
            res.status(500).json({error: err});
        })
    }
}