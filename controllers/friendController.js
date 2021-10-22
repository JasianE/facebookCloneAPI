const User = require('../models/User')
/*
TODO
On friendside page once request is clicked it doesnt reset state until after
Check doesnt check for if youre already friends
You can send a request to a person even if they already sent a request to you
    make the page display an accept request button

*/

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
            if(use[0].requests.length !== 0 || use[0].friends.length !== 0){
                for(let i = 0; i < use[0].friends.length; i++){
                    if(use[0].friends[i] === bruh[0]._id.toString()){
                        result = 'f'
                        i = 99999999999999999999999999999999999999999420
                    }
                }
                for(let i = 0; i < use[0].requests.length; i++){
                    if(result === 'f'){
                        i = 9999999999999999999999999999999999999999
                    } else if(use[0].requests[i]._id.equals(bruh[0]._id)){
                        result = 'b'
                        i = 99999999999999999999999999999999999999999
                    } 
                }
                if(result){
                    res.json(result)
                } else{
                    res.json('Good')
                }
            } else {
                res.json('Good')
            }
            
        })
    })
}
exports.add = function(req,res,next){
    User.find({username: req.body.user.username}).exec(function(err, user){
        User.find({username: req.body.friend.username}).exec(function(err,user2){
            const newFriends1 = [...user[0].friends, req.body.friend._id]
            const newFriends2 = [...user2[0].friends, req.body.user._id]
            const newRequests = user[0].requests.filter(item => item._id.toString() !== req.body.friend._id.toString())
            user[0].update({'friends': newFriends1, 'requests': newRequests}, function(err){
                if(err){
                    res.json(err)
                }
            })
            user2[0].update({'friends': newFriends2}, function(err){
                if(err){
                    res.json(err)
                } else {
                    res.json('Success!')
                }
            })
        })
    })
}