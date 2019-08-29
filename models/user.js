// This will hold the model for the users in the mongoose database 
const mongoose = require("mongoose"); 
const Schema =  mongoose.Schema; 

const userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, require: true}
}); 

const User = mongoose.model("Users", userSchema); 

module.exports = User; 
