const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
const weatherRoutes = require('./routes/weather');
const isAuthenticated = require('./middleware/authentication');
const mongoose = require('mongoose');
const url = `mongodb://${process.env.DBUSER}:${process.env.DBPASSOWRD}@ds125381.mlab.com:25381/todo-db`;
const port = process.env.PORT || 3000;

mongoose.connect(url);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/',indexRoutes);
app.use('/todos',isAuthenticated,todosRoutes);
app.use('/register',registerRoutes);
app.use('/login',loginRoutes);
app.use('/users',isAuthenticated,userRoutes);
app.use('/weather',isAuthenticated,weatherRoutes);

app.listen(port, ()=>{
    console.log(`server up on port ${port}`)
})