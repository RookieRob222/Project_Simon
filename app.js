//Author: Rick Roberts

var express = require('express');
var router = require('./routes/userRouter');
var path = require('path');
var app = express();

var port = process.env.PORT || 8080;

app.use('/', router);

//Still having troubles seriving static files
app.use(express.static(path.join(__dirname, 'public')));

// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);

//Need to Initialize DB 
