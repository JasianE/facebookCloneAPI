var express = require('express');
var router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Hi3')
});
router.get('/:username/:password/log-in', function(req,res,next){

  User.find({username: req.params.username}, function(err, doc){
    console.log(doc)
    if(err){
      res.json('No user')
    }
    bcrypt.compare(req.params.password, doc[0].password, (err, rest) => {
      if(rest){
        res.json(doc[0])
      } else {
        res.json('bad')
      }
    })
  })
})
router.post('/sign-up', function(req,res,next){
  console.log(req.body)
  User.find({username: req.body.username}, function(err, doc){
    if(doc.length > 0){
      return('Username Is Used')
    }
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
  })
})
router.get('/test', function(req,res){
  res.json('Hello')
  /*User.find({'username': 'hello'}, function(err, doc){
    const epic = [...doc[0].friends, 'hello2']
    doc[0].update({'friends': epic}, function(err){
      if(err){console.log(err)}
    })
    res.send('done')
  })*/
  /*bcrypt.hash('1234', 10, function(err, password){
    if(err) return err
    const user = new User({
      username: '/hello',
      firstname: 'hello',
      email: 'hello',
      lastname: 'hello',
      friends: [],
      password: password,
    }).save(err => {
      return err
    })
  })*/
})

module.exports = router;
