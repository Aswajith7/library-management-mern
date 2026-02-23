const Book = require('../models/Book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }); // newest first
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST add a book
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH issue a book
const issueBook = async (req, res) => {
  try {
    const { issuedTo } = req.body;
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ error: 'Book not found.' });
    if (book.isIssued) return res.status(400).json({ error: `Already issued to ${book.issuedTo}.` });
    if (!issuedTo) return res.status(400).json({ error: 'Provide the person name.' });

    book.isIssued = true;
    book.issuedTo = issuedTo;
    await book.save();

    res.json({ message: `Issued to ${issuedTo}`, book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH return a book
const returnBook = async (req, res) => {
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
};

// DELETE a book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found.' });
    res.json({ message: 'Book deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllBooks, addBook, issueBook, returnBook, deleteBook };