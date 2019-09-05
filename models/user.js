// This will hold the model for the users in the mongoose database 
const mongoose = require("mongoose"); 
const Schema =  mongoose.Schema; 

const userSchema = new Schema({
    local: {
        email: String,
        password: String
      },
      google:{
        token:String,
        displayName: String,
        email: String,
        id: String
      }
}); 

const User = mongoose.model("Users", userSchema); 

module.exports = User; 
