const mongoose = require('mongoose');

// Blueprint for what a book looks like in the database
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,           // removes extra spaces
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    isIssued: {
      type: Boolean,
      default: false,       // every new book starts as available
    },
    issuedTo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }      // auto adds createdAt and updatedAt fields
);

module.exports = mongoose.model('Book', BookSchema);