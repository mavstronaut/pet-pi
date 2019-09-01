// Remember to create these global variables on Heroku server
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// passport imports
const configureJWTStrategy = require('./routes/api/middlewares/passport-jwt');
const User = require('./models/user');
const configGoogleStrategy = require('./routes/api/middlewares/passport-google');


// regular server stuff

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/petPi";


async function mongoConnect(MONGODB_URI) {
  try {    
      await mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
      console.log("mongo has connected");
  } catch(err) {
      console.error("failed to connect mongo");
  }

  
};

mongoConnect(MONGODB_URI);


// adding passport init

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
configureJWTStrategy();
configGoogleStrategy();
// save user into session
// req.session.user = {userId}
passport.serializeUser((user, done) => {
  done(null, user._id);
});
// extract the userId from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
