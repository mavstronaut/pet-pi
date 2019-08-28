import axios from "axios";

export default {
  // call to the Google Book API when searching for a book
  searchAudio: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + query);
  },

  // display the saved books from our database
  getSavedAudio: function() {
    return axios.get("/api/audio/saved" );
  },
  // delete a saved book from our database
  deleteBook: function(id) {
    return axios.delete("/api/audio/delete/" + id);
  },

  // save the book in our database
  saveBook: function(youTubeData) {
    return axios.post("/api/audio/" + youTubeData);
  }
};
