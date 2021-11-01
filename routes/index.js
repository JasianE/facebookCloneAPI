var express = require('express');
var router = express.Router();
const User = require('../models/User')
const friendController = require('../controllers/friendController')
const userController = require('../controllers/userController')
import verifyToken from '../verifyToken'

/* User Actions */

//Get requests
router.get('/:username/:password/log-in', userController.login)
router.get('/:user/find', userController.find)
router.get('/:id/stupid', userController.stupid)
router.get('/:friends/:user/findPosts', userController.findPosts)
router.get('/everyone', userController.findEveryone)

//Post requests
router.post('/sign-up', verifyToken, userController.signup )
router.post('/write', userController.write)
router.post('/like', userController.like)
router.post('/unlike', userController.unlike)
router.post('/writeComment', userController.writeComment)

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
