import axios from "axios";
import youtube from "simple-youtube-api";

export default {
  // call to the Google Book API when searching for a book
  searchSounds: function(query) {
    let id = (() => {
      const parsed = parse(song, true);
      if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
        return parsed.query.v;
      } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
        return parsed.pathname.slice(1);
      }
    })();
  
    if (!id) {
      let results = await youtube.searchVideos(song, 4);
      id = results[0].id;
    }

    return id;
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
  saveSound: function(soundKey, soundData) {
    return axios.post("/api/sounds/" + soundKey, soundData);
  }

  // play sound, send link from the button click to the controllers/play.js
  /* playSound: function(soundLink) {
    return axios.post("/api/play/" + soundLink);
  } */
};
