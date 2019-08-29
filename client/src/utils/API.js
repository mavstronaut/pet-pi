import axios from "axios";

export default {
  // call to the Google Book API when searching for a book
  searchSounds: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
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
};
