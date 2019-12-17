var express = require('express');
var router = express.Router();

var ctrlUser = require  ('../controllers/userController');
var ctrlScore = require  ('../controllers/scoreController');
var jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/addScore', ctrlScore.addScore);
router.get('/showScore', ctrlScore.showScore);

module.exports = router;

