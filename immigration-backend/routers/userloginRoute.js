var express = require('express')

var router = express.Router()

// Getting the User Controller that we just created

var UserController = require('../controllers/userLoginCtrl');

// Map each API to the Controller FUnctions

router.post('/authenticateUser', UserController.authenticateUser)

// Export the Router
module.exports = router;