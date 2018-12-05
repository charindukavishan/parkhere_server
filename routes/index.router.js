const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const keeper=require('../controllers/parkkeeper.controller')
const filecntrl=require('../controllers/userfile');
const admincntrl=require('../controllers/adminfile')
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/userProfile/:id', ctrlUser.getowner);
router.get('/getname/:email', ctrlUser.getname);
router.put('/rstpw',ctrlUser.puttoken);
router.get('/resetpassword/:token', ctrlUser.rstpw);
router.put('/savepassword',ctrlUser.savepassword);
router.post('/newPost', ctrlUser.newPost);
router.get('/getPosts',ctrlUser.getPosts)
router.put('/editpro/:id',ctrlUser.editpro);

router.post('/regkeeper/:id',keeper.pkregister);
router.get('/getkeepers/:id', keeper.getkeepers);
router.get('/setstate/:id/:state',keeper.setstate);
router.get('/getnewkeepers',keeper.getnewkeepers);
router.get('/acceptpark/:id',keeper.acceptpark)

router.get('/users', ctrlUser.users);
router.get('/readmsg/:file',ctrlUser.readmsg);
router.get('/getowners', ctrlUser.getowners);

router.post('/upload/:id',filecntrl.savefile);
router.get('/files/:id',filecntrl.files)
router.get('/file/:filename',filecntrl.file)
router.get('/adminfile/:filename',filecntrl.adminfile)
router.get('/getusername/:id',ctrlUser.getusername)

router.post('/upload/:id/:sid',admincntrl.savefile);
router.get('/rfiles/:id',admincntrl.files)
router.get('/userfiles',admincntrl.userfiles)
router.get('/admindoc',admincntrl.adminfiles)
router.get('/messages',admincntrl.messages)
module.exports = router;



