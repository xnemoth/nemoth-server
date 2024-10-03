const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    title: {
    type: String,
    required: true,
    },
    description: {
    type: String,
    required: true,
    },
    link: {
    type: String,
    required: true,
    },
  });
  
const Bookmark = mongoose.model('Bookmark', bookmarkSchema, 'bookmark');

module.exports = Bookmark;