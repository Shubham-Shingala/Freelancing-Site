const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const projectRoute = require('./route/project-route');
const cors = require('cors');
const fileUpload=require('express-fileupload')
const userRoute=require('./route/user-route');
const bidRoute=require('./route/bid-route');
var config = require('./config');

const app=express();
app.use(fileUpload());


mongoose.Promise=global.Promise;
mongoose.connect(config.MONGO_URI,{
  useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true,autoIndex: true,useFindAndModify: false 
}).then(()=>{
    console.log('Database sucessfully connected')
},error=>{
    console.log('Database could not connected: ' + error)
})
mongoose.set('debug', true);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()); 

app.use('/api',projectRoute);
app.use('/user',userRoute);
app.use('/bid',bidRoute);


const server = app.listen(config.LISTEN_PORT, () => {
  console.log('Connected to port ' + config.LISTEN_PORT)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
 });
 
 // error handler
 app.use(function (err, req, res, next) {
   console.error(err); // Log error message in our server's console
   if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
   res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
 });