const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  addBook,
  issueBook,
  returnBook,
  deleteBook,
} = require('../controllers/bookController');

router.get('/',          getAllBooks);   // GET    /api/books
router.post('/',         addBook);       // POST   /api/books
router.patch('/:id/issue',  issueBook); // PATCH  /api/books/:id/issue
router.patch('/:id/return', returnBook);// PATCH  /api/books/:id/return
router.delete('/:id',    deleteBook);   // DELETE /api/books/:id

module.exports = router;