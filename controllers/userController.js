//Author: Bob Moore

//var User = require('../models/userModel'); Not implemented yet
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


/* .sendFile() requires an absolute path as opposed to a relative path.
 * __dirname gives absolute path to userController.js so we need to move up a level 
 * to find views. That means these paths are still relative and likely will not work 
 * properly on Windows. Change the slashes if neccesary to test but DO NOT push to 
 * github in this condition. Our project is intended to run in a unix environment.*/
exports.user_create_get = function(req, res){
	res.sendFile(path.join(__dirname, '../views/signUp.html'));
}

exports.user_create_post = function(req, res){
	res.send('NOT IMPLEMENTED: user create POST');
}

exports.user_login_get = function(req, res){
	res.sendFile(path.join(__dirname, '../views/login.html'));
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


