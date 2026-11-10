const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema (
    {
        titlle: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [2, 'Title must be at least 2 characters long']
        },
        
        issuedAt: {
            type: Date,
            default: null
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);