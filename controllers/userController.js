const User = require('../models/User')
//Finds User, returns user
//Once displayed controller can send friend request 
//Request uses home's current user and sends it to the requested friend user from state (stores new user in a state box that resets once the user leaves pages)
//This request is then sent to the other user where they can either accept or reject
//Once accepted use friendController.add
exports.find = function(req,res,next){
    User.find({username: req.params.user}, function(err, user){
        if(user.length === 0){
            res.json('No User Found')
        } else{
            res.json(user[0])
        }
    })
}
exports.stupid = function(req,res,next){
    console.log(req.params)
    User.find({"_id": req.params.id}, function(err, user){
        res.json(user[0])
    })
}