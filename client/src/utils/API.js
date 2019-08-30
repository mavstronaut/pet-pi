import axios from "axios";
import youtube from "simple-youtube-api";

export default {
  // call to the Google Book API when searching for a book
  searchSounds: function(query) {
    // validates that it came from youtube
    
  },

  // display the saved sounds from our database
  getSavedSounds: function() {
    return axios.get("/api/sounds/saved" );
  },
  // delete a saved book from our database
  deleteSound: function(id) {
    return axios.delete("/api/sounds/delete/" + id);
  },

  // save the Sound in our database
  // saveSound: function(soundKey, soundData) {
  //   return axios.post("/api/sounds/" + soundKey, soundData);
  // }

    // save the Sound in our database
    saveSound: function(soundData) {
      return axios.post("/api/sounds/" + soundData);
    },

    playSound: function(clicked) {
      return axios.post("/api/sounds/" + clicked);
    }

  // play sound, send link from the button click to the controllers/play.js
  /* playSound: function(soundLink) {
    return axios.post("/api/play/" + soundLink);
  } */
};
