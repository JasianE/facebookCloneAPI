const User = require('../models/User')

exports.send = function(req,res,next){
    User.find({username: req.body.friendUsername}).exec(function(err, user){
        console.log(user)
    })
}