import axios from "axios";

export default {
  // Gets all posts
  getPosts: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getPost: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deletePost: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  savePost: function(postData) {
    return axios.post("/api/posts", postData);
  }
};
