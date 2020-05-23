const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mernauth', {useNewUrlParser : true, useUnifiedTopology: true },()=>{
    console.log('successfully connected to database');
});

const UserRouter = require('./routes/User');
app.use('/user', UserRouter);

app.listen(5000,()=>{
    console.log('express server started');
});