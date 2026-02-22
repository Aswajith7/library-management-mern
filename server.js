const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();   // loads .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Book model
const Book = require('./models/Book');

// ─────────────────────────────────────────────
// Connect to MongoDB
// ─────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// ─────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();   // fetch all books from MongoDB
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST add a book
app.post('/books', async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author }); // create new book using schema
    await book.save();                         // save to MongoDB
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH issue a book
app.patch('/books/:id/issue', async (req, res) => {
  try {
    const { issuedTo } = req.body;
    const book = await Book.findById(req.params.id);  // find by MongoDB _id

    if (!book) return res.status(404).json({ error: 'Book not found.' });
    if (book.isIssued) return res.status(400).json({ error: `Already issued to ${book.issuedTo}.` });
    if (!issuedTo) return res.status(400).json({ error: 'Provide the person name.' });

    book.isIssued = true;
    book.issuedTo = issuedTo;
    await book.save();   // save updated book back to MongoDB

    res.json({ message: `Issued to ${issuedTo}`, book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH return a book
app.patch('/books/:id/return', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ error: 'Book not found.' });
    if (!book.isIssued) return res.status(400).json({ error: 'Book is not currently issued.' });

    book.isIssued = false;
    book.issuedTo = null;
    await book.save();

    res.json({ message: 'Book returned successfully.', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
// Start server
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server is running on http://localhost:${PORT}`));