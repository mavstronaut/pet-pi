import axios from "axios";

export default {
  // call to the Google Book API when searching for a book
  searchSounds: function(query, queryType) {
    // validates that it came from youtube
    return axios.post("/api/sounds/play" + query, queryType)
  },

  // display the saved sounds from our database
  getSavedSounds: function() {
    try {
      return axios.get("/api/sounds/saved");
    }
    catch {
      return axios.get("./hardSounds");
    }
  },
    // display the hard coded saved sounds from our database
    getHardSounds: function() {
      return axios.get("./hardSounds");
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

  // user api routes


  // future options to add to backend from here for the node-media-stream of video
  // API.playVideo(this.state.link) { post link to get stream response }

  // API.playLocalVideo(homeLink) { get method for feed}
};
