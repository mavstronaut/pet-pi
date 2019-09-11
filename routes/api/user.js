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


// adding the functions for auth
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
        res.redirect('/');
}

function isSuperAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 0)
        return next();
        res.redirect('/live-detection');
}

function isSystemAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 1)
        return next();
        res.redirect('/live-detection');
}

function isUserAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 2)
        return next();
        res.redirect('/live-detection');
}

function isStandardUser(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 4)
        return next();
        res.redirect('/live-detection');
}

function isDetectionOnly(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 5)
        return next();
        res.redirect('/live-detection');
}


module.exports = router;
