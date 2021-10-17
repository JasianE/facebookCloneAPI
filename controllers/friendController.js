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
            let result;
            const id = bruh[0]._id
            const id2 = use[0].requests[0]._id
            console.log(id, id2, id === id2)
            for(let i = 0; i < use[0].requests.length; i++){
                if(use[0].requests[i]._id === bruh[0]){
                    result = true
                    i = 99999999999999999999999999999999999999999
                } 
            }
            if(result){
                res.json('Bad')
            } else{
                res.json('Good')
            }
        })
    })
}