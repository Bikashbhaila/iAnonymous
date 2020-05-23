const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5000;


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
  const UserRouter = require('./routes/User');
  app.use('/user', UserRouter);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernauth', {useNewUrlParser : true, useUnifiedTopology: true },()=>{
    console.log('successfully connected to database');
});

// const UserRouter = require('./routes/User');
// app.use('/user', UserRouter);

// app.listen(5000,()=>{
//     console.log('express server started');
// });

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });