// This will hold the model for the sounds in the mongoose database 
const mongoose = require("mongoose"); 
const Schema =  mongoose.Schema; 

const soundSchema = new Schema({
    title: {type: String , required: true},
    type: {type: String, required: true},
    link: {type: String, required: false}, 
}); 

const SavedSounds = mongoose.model("SavedSounds", soundSchema); 

module.exports = SavedSounds; 
