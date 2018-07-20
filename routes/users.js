var express = require('express');
var router = express.Router();
var userController = require('../controller/user.js')
var images = require('../helpers/images')
var auth = require('../middleware/auth.js')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.create)

router.post('/login', userController.login)

router.get('/profile',auth.cekToken, userController.findUser)

router.put('/edit-profile',auth.cekToken, userController.update)

router.delete('/delete',auth.cekToken, userController.delete)

router.post('/image-upload',auth.cekToken,
  images.multer.single('image'), 
  images.sendUploadToGCS,
  userController.uploadImage)

router.get('/image', userController.getImage)

module.exports = router;
