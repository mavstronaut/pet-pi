const Passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
require('dotenv').config();
const User = require('../../../models/user');

const configGoogleStrategy = () => {
    var GOOG_CLIENTID = process.env.GOOG_CLIENTID;
    var GOOG_CLIENTSECRET = process.env.GOOG_CLIENTSECRET;
    var CALLBACKURL = process.env.CALLBACKURL;

    Passport.use(new GoogleStrategy.OAuth2Strategy({
        clientID: GOOG_CLIENTID,
        clientSecret: GOOG_CLIENTSECRET,
        callbackURL: CALLBACKURL
    },
  async (accessToken, refreshToken, profile, done) => {
      try{
       const user = await User.findOne({'google.id': profile.id});
       if(user){
           return done(null, user);
       }
       const newUser = new User({});
       newUser.google.id = profile.id;
       newUser.google.token= accessToken;
       newUser.google.displayName = profile.displayName;
       newUser.google.email = profile.emails[0].value;
       await newUser.save();
       return done(null, newUser);
      }
      catch(err){
          console.error(err);
          return done(err);
      }
  }
  )
)
}

module.exports = configGoogleStrategy; 