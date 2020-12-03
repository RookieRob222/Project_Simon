//Author: Sean Barrett
var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var User = require('./userModel');
mongoose.connect('mongodb://localhost:27017/simonDB');

async function createUser(username,password){
    return await User.create({_id:'username',password:'password'});
} 

async function getUser(username){
    return await User.findById(username);
}

async function getAllUsers(){
    return await User.find({});
}

async function setScore(username,score){
    return await User.findByIdAndUpdate(username,{$set:{highscore=score}});
}

async function getScore(username){
    return await  User.findById(username,{_id:0,highscore:1,password:0});
}

async function getAllScores(){
    return await  User.find({},{_id:1,highscore:1,password:0});
}

async function top5(){
    return await User.find({},{_id:1,highscore:1,password:0}).sort({ highscore: 'asc' }).limit(5);
}
