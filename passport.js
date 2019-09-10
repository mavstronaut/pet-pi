var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt');
const SHA512       = require('./SHA512');

var connection = mysql.createConnection({
    connectionLimit: 100,
    host: process.env.host,
    user: process.env.user,
    password: process.env.db_pa,
    database: process.env.database
})

module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.EMAIL);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM USERS WHERE EMAIL = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'login',
        new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            var ip = req.headers['x-forwarded-for'] || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             (req.connection.socket ? req.connection.socket.remoteAddress : null);
            connection.query(`INSERT INTO LOG_LOGIN (USERID, IP) VALUES (?, ?)`, [email, ip], (err, result) => { 
                if (err){console.log(err);}
                console.log({result});
            })
            connection.query("SELECT * FROM USERS WHERE email = ?",[email], function(err, rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Incorrect email or password')); // req.flash is the way to set flashdata using connect-flash
                }
                if(bcrypt.compareSync(password, rows[0].PASSWORD)) {
                    console.log('they match')
                    return done(null, rows[0]);
                   } else {
                       console.log('no match')
                    return done(null, false, req.flash('loginMessage', 'Incorrect email or password')); // incorrect PW
                   }
            });
        })
    );
};
