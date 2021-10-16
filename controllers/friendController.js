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
    User.find({username: req.params.friend}).exec(function(err, use){
        User.find({username: req.params.user}).exec(function(err, bruh){
            console.log(bruh[0]._id, use[0].requests, use[0].requests.indexOf(bruh[0]._id))
            if(use[0].requests.indexOf(bruh[0]._id) !== -1){
                res.json('Bad')
            } else{
                res.json('Good')
            }
        })
    })
}