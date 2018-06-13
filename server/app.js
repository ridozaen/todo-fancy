const express = require('express');
const app = express();
require('dotenv').config();
const indexRoutes = require('./routes/index');
const todosRoutes = require('./routes/todos');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const userRoutes = require('./routes/users');
const isAuthenticated = require('./middleware/authentication');
const mongoose = require('mongoose');
const dbName = 'todoDb'
const url = `mongodb://localhost:27017/${dbName}`;
const port = process.env.PORT || 3000;

mongoose.connect(url);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/',indexRoutes);
app.use('/todos',isAuthenticated,todosRoutes);
app.use('/register',registerRoutes);
app.use('/login',loginRoutes);
app.use('/users',isAuthenticated,userRoutes);

app.listen(port, ()=>{
    console.log(`server up on port ${port}`)
})