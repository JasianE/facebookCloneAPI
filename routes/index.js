var express = require('express');
var router = express.Router();
const User = require('../models/User')
const friendController = require('../controllers/friendController')
const userController = require('../controllers/userController')

function verifyToken(req,res,next){
  const bearer = req.headers['authorization']

  if(typeof bearer === 'undefined'){
      res.sendStatus(403)
  } else{
      const token = bearer.split(' ')[1]
      req.token = token
      next()
  }
}


/* User Actions */

//Get requests
router.get('/:username/:password/log-in', userController.login)
router.get('/:user/find', userController.find)
router.get('/:id/stupid', userController.stupid)
router.get('/:friends/:user/findPosts', userController.findPosts)
router.get('/everyone', userController.findEveryone)

//Post requests
router.post('/sign-up', userController.signup )
router.post('/write', verifyToken, userController.write)
router.post('/like', verifyToken, userController.like)
router.post('/unlike', verifyToken, userController.unlike)
router.post('/writeComment', verifyToken, userController.writeComment)

router.get('/', function(req, res, next) {
  res.json('Hi3')
});
/*Friend Actions */

//Get Requests
router.get('/:user/:friend/check', friendController.check)

//Post requests
router.post('/send', friendController.send)
router.post('/add', friendController.add)


module.exports = router;
