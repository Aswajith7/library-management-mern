const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema (
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [2, 'Title must be at least 2 characters long']
        },
        author: {
            type: String,
            required: [true, 'Author is required'],
            trim: true,
            minlength: [2, 'Author must be at least 2 characters long']
        },
        isIssued: {
            type: Boolean,
            default: false
        },
        issuedTo: {
            type: String,
            trim: true,
            minlength: [2, 'Issued to must be at least 2 characters long']
        },
        issuedAt: {
            type: Date,
            default: null
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);