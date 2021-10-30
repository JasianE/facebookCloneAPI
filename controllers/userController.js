const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
exports.login = function(req,res,next){
    User.find({username: req.params.username}, function(err, doc){
      if(err || doc.length === 0){
        console.log('Here!!!')
        res.json('No user')
      } else {
          bcrypt.compare(req.params.password, doc[0].password, (err, rest) => {
            if(rest){
                const info = {
                    user: doc[0]
                }
                const token = jwt.sign(doc[0], 'esam', {expiresIn: 3600})
                console.log(token)
                res.json(doc[0])
            } else {
                res.json('Wrong Information')
            }
          })
        }
    })
}
exports.stupid = function(req,res,next){
    console.log(req.params)
    User.find({"_id": req.params.id}, function(err, user){
        res.json(user[0])
    })
}
exports.signup = function(req,res,next){
    User.find({username: req.body.username}, function(err, doc){
      if(doc.length > 0){
        return('Username Is Used')
      } else {
          bcrypt.hash(req.body.password, 10, (err, hashed) => {
            if(err){
              res.json('failed')
            }
            const user = new User({
              username: req.body.username,
              firstname: req.body.firstname,
              email: req.body.email,
              lastname: req.body.lastname,
              password: hashed,
            }).save(function(err){
              if(err){
                console.log(err)
                res.json('Bad Req')
                return next(err)
              }
              res.json('Good')
            })
          })
      }
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
           sender: req.body.user.username,
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
exports.findPosts = function(req,res,next){
    /*
    Finds Friends and user stores them in array
    maps through array, pushing each post into posts array
    sorts posts by date
    returns posts array
     */
    const friends = req.params.friends.split(',')
    const og = JSON.parse(req.params.user)
    let posts = [...og]

    for(let i = 0; i < friends.length; i++){
        if(i === friends.length - 1){
            User.find({'_id': friends[i]}, function(err, user){
                posts = [...posts, ...user[0].posts]
                res.json(posts)
            })
        } else {
            User.find({'_id': friends[i]}, function(err, user){
                posts = [...posts, ...user[0].posts]
            })
        }
    }
    console.log('hello')
}
exports.like = function(req,res,next){
    /*
    Finds User then finds post
    Adds current user to post likers
     */
    console.log(req.body.post)
    User.find({'username': req.body.post.sender}, function(err, userr){
        const user = userr[0]
        //Looks through posts and finds the post that is the same as the post we sent in poopbok
        const post = user.posts.find((key) => {
            return key._id.toString() === req.body.post._id.toString()
        })
        const newPosts = [...post.likers, req.body.user._id] 
        post.likers = newPosts
        const newPosts2 = user.posts.splice(user.posts.indexOf(req.body.post), 1, newPosts)
        user.update({'posts': newPosts2}, function(err){
            if(err){
                res.json(err)
            } else {
                res.json('Good')
            }
        })
    })
}
exports.unlike = function(req,res,next){
    console.log(req.body.post.sender)
    User.find({'username:': req.body.post.sender}, function(err, user2){
        const user = user2.find((key) => {return key.username === req.body.post.sender})
        const post = user.posts.find((key) => {
            return key._id.toString() === req.body.post._id.toString()
        })
        console.log(post)
        
        const newLikers = post.likers.filter((key) => {
            return key.toString() !== req.body.user._id
        })
        post.likers = newLikers
        const newPosts = user.posts.splice(user.posts.indexOf(req.body.post), 1, post)
        user.update({'posts': newPosts}, function(err){
            if(err){
                res.json(err)
            } else{
                res.json('ok')
            }
        })
        
    })
}
exports.writeComment = function(req,res,next){
    User.find({'username': req.body.post.sender}, function(err, user2){
        const user = user2.find((key) => {return key.username === req.body.post.sender})
        const post = user.posts.find((key) => {
            return key._id.toString() === req.body.post._id.toString()
        })
        post.comments.push({sender: req.body.user, message: req.body.comment})
        const newPosts = user.posts.splice(user.posts.indexOf(req.body.post), 1, post)
        user.update({'posts': newPosts}, function(err){
            if(err){
                res.json(err)
            } else {
                res.json('ok')
            }
        })
        
    })
}
exports.findEveryone = function(req,res,next){
    User.find({}, function(err, users){
        if(err){
            res.json(err)
        } else {
            res.json(users)
        }
    })
}