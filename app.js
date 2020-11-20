//Author: Rick Roberts

var express = require('express');
var router = require('./routes/userRouter');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

app.use('/', router);
app.use('/public', express.static(path.join(__dirname, 'public')));

//Start the server 
//Still need to add DB connection
app.listen(port);

console.log('Server started! At http://localhost:' + port);
