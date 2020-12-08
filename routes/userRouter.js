//Author: Bob Moore

var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//GET redirect to login page uri
router.get('/', function(req, res){
	res.redirect('/user/login');
});

//GET request for signup page
router.get('/user/create', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'views', 'signUp.html'));
});

//POST request to create new user
router.post('/user/create', function(req, res){
	res.send('NOT IMPLEMENTED: user create POST');
});

//GET request for login page
router.get('/user/login', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
});

//POST request username and password to sign in
router.post('/user/login', function(req, res){
	res.redirect('/user/game');
});

//GET request for game page
router.get('/user/game', function(req, res){
	res.sendFile(path.join(__dirname, '..', 'views', 'game.html'));
});

//GET current high score
router.get('/user/:username/highScore', function(req, res){
	res.send('NOT IMPLEMENTED: user score GET');
});

//POST new score /user/:username/new-score
router.post('/user/newScore', function(req, res){
	console.log(req.body);
	res.send(`NOT IMPLEMENTED: user score POST`);
});

module.exports = router;
