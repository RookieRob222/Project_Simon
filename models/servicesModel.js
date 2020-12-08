//Author:Rick Roberts
const dbmodel = require('dbmodel');
const userModel = require('userModel');


// Checks if score is higher than in DB
// Returns true if it is.
isHighScore(username, score, ()=>{
    dbscore= getUser(username)
    if (score > dbscore.highscore) 
        return true;
});



// Checks to see if the user is in the DB
// If they are, returns true.
isUser(username, ()=>{
    if(username == getUser(username))
        return true;
});



model.exports.servicesModel = servicesModel;