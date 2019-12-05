const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const errorMiddleware = require('./middlewares/error-handler');
const mongoAtlasUri = 'mongodb+srv://avihu:avihucohen@todolistapp-5et3x.mongodb.net/test?retryWrites=true&w=majority';
const app = express();


  // Enable All CORS Requests
  app.use(cors());


  //APP Routs


  // Catch all errors that thrown
  app.use(errorMiddleware);


  // Connect to DB
  mongoose.connect(mongoAtlasUri)
  .then( result => {
      console.log("MongoDB Connected");
      app.listen(8080);
  })
  .catch(err => console.log(err));