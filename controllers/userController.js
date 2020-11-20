//Author: Bob Moore

//var User = require('../models/userModel'); Not implemented yet
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


exports.user_create_get = function(req, res){
	res.send('NOT IMPLEMENTED: user create GET');
}

exports.user_create_post = function(req, res){
	res.send('NOT IMPLEMENTED: user create POST');
}

exports.user_login_get = function(req, res){
	res.send('NOT IMPLEMENTED: user login GET');
	//res.sendFile('/home/bob/Documents/School/Semester_XI/APW_JS_MW/HW/Project_Simon/views/login.html');
}

exports.user_login_post = function(req, res){
	res.send('NOT IMPLEMENTED: user login POST');
}

exports.user_score_get = function(req, res){
	res.send('NOT IMPLEMENTED: user create GET');
}

exports.user_score_post = function(req, res){
	res.send('NOT IMPLEMENTED: user create POST');
}


