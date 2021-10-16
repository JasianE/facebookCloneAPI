const User = require('../models/User')

exports.send = function(req,res,next){
    User.find({username: req.body.friend.username}).exec(function(err, user){
        const person = user[0]
        const coolio = [...user[0].requests, req.body.user]
        user[0].update({'requests': coolio}, function(err){
            if(err){
                res.json('Error:' + err)
            } else {
                res.json('Success!')
            }
        })
    })
}
exports.check = function(req,res,next){
    const friend = User.find({username: req.params.friend}).exec(function(err, use){
        return use[0]._id
    })
    const user = User.find({username: req.params.user}).exec(function(err, use){
        return use[0]._id
    })
    console.log(friend, user)
}