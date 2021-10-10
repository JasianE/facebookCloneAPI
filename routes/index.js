var express = require('express');
var router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('Hi')
});
router.post('/log-in', function(req,res,next){
  console.log(req.body)
  User.find({username: req.body.username}, function(err, doc){
    bcrypt.compare(req.body.password, doc[0].password, (err, rest) => {
      if(rest){
        res.json(doc[0])
      } else {
        res.json('bad')
      }
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
