const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  app.use((error, req, res, next) => {
    console.log(error.message);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });

  mongoose.connect(
      'mongodb+srv://roystern92:r123456r@cluster0-5et3x.mongodb.net/test?retryWrites=true&w=majority'
  )
  .then( result => {
      console.log("MongoDB Connected");
      app.listen(8080);
  })
  .catch(err => console.log(err));