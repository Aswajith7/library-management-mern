const express = require('express');
const router  = express.Router();

const {
  getAllBooks,
  getBorrowedBooks,
  addBook,
  issueBook,
  returnBook,
  deleteBook,
} = require('../controllers/bookController');

router.get('/',             getAllBooks);
router.get('/borrowed',     getBorrowedBooks);
router.post('/',            addBook);
router.patch('/:id/issue',  issueBook);
router.patch('/:id/return', returnBook);
router.delete('/:id',       deleteBook);

module.exports = router;