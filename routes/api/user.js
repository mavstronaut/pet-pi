const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('passport');

// Signup
router.post('/signup', userController.signup);

// Login
router.post('/login', userController.login);

// authenticate
router.get(
  '/authenticate',
  passport.authenticate('jwt', { session: false }),
  userController.authenticate
);
	  
// google auth
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// google auth fails
router.get(
  '/authenticate',
  passport.authenticate('jwt', { session: false }),
  userController.authenticate
);

module.exports = router;
