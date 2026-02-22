const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let books = [
  { id: 1, title: 'The Alchemist', author: 'Paulo Coelho', isIssued: false, issuedTo: null },
  { id: 2, title: '1984', author: 'George Orwell', isIssued: false, issuedTo: null },
];

let nextId = 3;

app.get('/books', (req, res) => {
  res.json(books);
});

app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = { id: nextId++, title, author, isIssued: false, issuedTo: null };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.patch('/books/:id/issue', (req, res) => {
  const id = parseInt(req.params.id);
  const { issuedTo } = req.body;
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found.' });
  if (book.isIssued) return res.status(400).json({ error: `Already issued to ${book.issuedTo}.` });
  if (!issuedTo) return res.status(400).json({ error: 'Provide the person name.' });
  book.isIssued = true;
  book.issuedTo = issuedTo;
  res.json({ message: `Issued to ${issuedTo}`, book });
});

app.patch('/books/:id/return', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found.' });
  if (!book.isIssued) return res.status(400).json({ error: 'Book is not currently issued.' });
  book.isIssued = false;
  book.issuedTo = null;
  res.json({ message: 'Book returned successfully.', book });
});

app.listen(5000, () => {
  console.log('✅ Server is running on http://localhost:5000');
});
