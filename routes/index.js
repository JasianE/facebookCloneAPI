var express = require('express');
var router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const friendController = require('../controllers/friendController')
const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Hi3')
});
router.get('/:username/:password/log-in', function(req,res,next){
  User.find({username: req.params.username}, function(err, doc){
    if(err || doc.length === 0){
      console.log('Here!!!')
      res.json('No user')
    } else {
        bcrypt.compare(req.params.password, doc[0].password, (err, rest) => {
          if(rest){
            res.json(doc[0])
          } else {
            res.json('Wrong Information')
          }
        })
      }
  })
})
router.post('/sign-up', function(req,res,next){
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
})
router.post('/send', friendController.send)
router.get('/:user/find', userController.find)
router.get('/:user/:friend/check', friendController.check)
router.get('/:id/stupid', userController.stupid)
router.post('/add', friendController.add)
router.post('/:friends/:user/write', userController.write)
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
