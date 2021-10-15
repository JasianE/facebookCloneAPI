const User = require('../models/User')

exports.find = function(req,res,next){
    User.find({username: req.params.user}, function(err, user){
        console.log(user)
    })
}