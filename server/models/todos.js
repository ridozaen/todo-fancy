const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = Schema({
    task : {type:String, required:true},
    isDone : Boolean,
    userId : {type: Schema.Types.ObjectId, ref: 'User'}
},
{
    timestamps : true
});


module.exports = mongoose.model('Todo', todoSchema);

