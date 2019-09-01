import Passport from 'passport';
import PassportJWT from 'passport-jwt';
require('dotenv').config();
import userController from '../../../controllers/userController';
import User from '../user/user.model';

export const configureJWTStrategy = () => {
  const opts = {};
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