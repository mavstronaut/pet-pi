const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('passport');

// Signup
router.route("/signup")
	.post(userController.signup);

// Login
router.route("/login")
  	.get(userController.login);

// authenticate
router.route("/authenticate")
    .get(passport.authenticate('jwt', {session: false}), userController.authenticate);
	  
	  
// google auth
 router.route("/auth/google")
	.get(passport.authenticate('google', { scope: ['profile', 'email']}));
	
// google auth fails
router.route("/auth/google/callback")
	.get(passport.authenticate('google', { failureRedirecdt: '/login' }),
    userController.authSucccess);

module.exports = router;
