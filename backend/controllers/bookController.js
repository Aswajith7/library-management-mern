const Book = require('../models/Book');

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET borrowed books
const getBorrowedBooks = async (req, res) => {
  try {
    const borrowedBooks = await Book.find({ isIssued: true })
      .sort({ issuedAt: -1 });
    res.json(borrowedBooks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST add book
const addBook = async (req, res) => {
  try {
    const { title, author } = req.body;

    const existing = await Book.findOne({
      title: { $regex: new RegExp(`^${title}$`, 'i') }
    });
    if (existing) {
      return res.status(400).json({ error: 'A book with this title already exists.' });
    }

    const book = new Book({ title, author });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH issue book
const issueBook = async (req, res) => {
  try {
    const { issuedTo } = req.body;
    const book = await Book.findById(req.params.id);

    console.log('Book found:', book);        // ADD THIS
    console.log('issuedTo received:', issuedTo); // ADD THIS

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (book.isIssued) {
      return res.status(400).json({ error: `Already issued to ${book.issuedTo}.` });
    }
    if (!issuedTo || issuedTo.trim().length < 2) {
      return res.status(400).json({ error: 'Borrower name must be at least 2 characters.' });
    }

    console.log('Before save - isIssued:', book.isIssued); // ADD THIS
    book.isIssued = true;
    book.issuedTo = issuedTo.trim();
    book.issuedAt = new Date();
    await book.save();
    console.log('After save - isIssued:', book.isIssued); // ADD THIS

    res.json({ message: `Issued to ${issuedTo}`, book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH return book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (!book.isIssued) {
      return res.status(400).json({ error: 'Book is not currently issued.' });
    }

    book.isIssued = false;
    book.issuedTo = null;
    book.issuedAt = null;
    await book.save();

    res.json({ message: 'Book returned successfully.', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found.' });
    }
    if (book.isIssued) {
      return res.status(400).json({
        error: `Cannot delete. Book is currently issued to ${book.issuedTo}.`
      });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  getBorrowedBooks,
  addBook,
  issueBook,
  returnBook,
  deleteBook,
};