//Author: Bob Moore

var express = require('express');
var userController = require('../controllers/userController');
var router = express.Router();

//GET redirect to login page uri
router.get('/', userController.index);

//GET request for signup page
router.get('/user/create', userController.user_create_get);

//POST request to create new user
router.post('/user/create', userController.user_create_post);

//GET request for login page
router.get('/user/login', userController.user_login_get);

//POST request username and password to sign in
router.post('/user/login', userController.user_login_post);

//GET request for game page
router.get('/user/game', userController.user_game_get);

//GET current high score
router.get('/user/:username/high-score', userController.user_score_get);

//POST new score /user/:username/new-score
router.post('/user/new-score', userController.user_score_post);

module.exports = router;
