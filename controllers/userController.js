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
exports.write = function(req,res,next){
    /* Stores it in users comments
    Stores Text
    When homepage is read scan through each friend of the users post
    Sort chronilogiclaylasdsfal and yeah
    Ok it hink this is a good way to do ti
    */
   User.find({username: req.body.user.username}, function(err, user){
       const post = {
           post: req.body.post
       }
       const newPosts = [...user[0].posts, post]
       console.log(newPosts)
       user[0].update({'posts': newPosts}, function(err){
           if(err){
               res.json(err)
           } else{
               res.json(':)')
           }
       })
   })

}