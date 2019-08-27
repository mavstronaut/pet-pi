// This will hold the model for the audio links in the mongoose database 
const mongoose = require("mongoose"); 
const Schema =  mongoose.Schema; 

const audioSchema = new Schema({
    title: {type: String, required: true},
    type: {type: String, required: true},
    link: {type: String, required: false}
}); 

const SavedAudio = mongoose.model("SavedAudio", audioSchema); 

module.exports = SavedAudio; 
