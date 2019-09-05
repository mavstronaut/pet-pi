const Passport = require('passport');
const PassportJWT = require('passport-jwt');
require('dotenv').config();
const userController = require('../../../controllers/userController');
const User = require('../../../models/user');


const configureJWTStrategy = () => {
  const opts = {};
  var SECRET = process.env.SECRET;
  opts.jwtFromRequest = PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = SECRET;
  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};

module.exports = configureJWTStrategy; 