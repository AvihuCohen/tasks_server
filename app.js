const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');


//configuration
const multerConfig = require('./configuration/multer-configuration');

//Middleware
const errorMiddleware = require('./middlewares/error-handler');

//controllers
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

//Mongo Atlas Connection URI
const mongoAtlasUri = 'mongodb+srv://avihu:avihucohen@todolistapp-5et3x.mongodb.net/test?retryWrites=true&w=majority';


const app = express();


// Enable All CORS Requests
app.use(cors());

// Parse incoming request bodies only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json());

//configure multer where to store the file and what kind of files to are allowed
app.use(
    multer(
        {
            storage: multerConfig.fileStorage,
            fileFilter: multerConfig.fileFilter
        }
    ).single('image')
);
// make images folder a static folder
app.use('images', express.static(path.join(__dirname, 'images')));


//APP Routs
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

// Catch all errors that thrown
app.use(errorMiddleware);


// Connect to DB
mongoose.connect(mongoAtlasUri)
    .then(result => {
        console.log("MongoDB Connected");
        app.listen(8080);
    })
    .catch(err => console.log(err));