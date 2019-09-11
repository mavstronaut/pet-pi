const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require('passport');
const bcrypt       = require("bcrypt");
const uuidv1       = require('uuid/v1');

/* depracated
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
*/


 //Root / login UI page
 app.get('/', function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

//Login UI route
app.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

//Logout
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Login POST
app.post('/login', passport.authenticate('login', {
  successRedirect : '/saved',
  failureRedirect : '/login',
  failureFlash : true
}));



  //APIs
  app.get('/allWhitelist', isSystemAdmin, function(req, res) {
    pool2.getConnection((err, conn) => {
        if(err) console.log('err', err);
        let sql = `SELECT * from WHITELIST`;
        conn.query(sql, (err, result) => {
                if(err) console.log(err)
                res.json(result)
        })
        conn.release();
    })
});


// adding the functions for auth
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
        res.redirect('/');
}

function isSuperAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 0)
        return next();
        res.redirect('/saved');
}

function isSystemAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 1)
        return next();
        res.redirect('/saved');
}

function isUserAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 2)
        return next();
        res.redirect('/saved');
}

function isStandardUser(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 4)
        return next();
        res.redirect('/saved');
}

function isDetectionOnly(req, res, next) {
    if (req.isAuthenticated() && req.user.LEVEL <= 5)
        return next();
        res.redirect('/saved');
}


module.exports = router;
