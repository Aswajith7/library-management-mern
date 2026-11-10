import { useState, useEffect } from 'react';
import api from '../api';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      const res = await api.get('/books');
      setBooks(res.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const fetchBorrowedBooks = async () => {
    try {
      const res = await api.get('/books/borrowed');
      setBorrowedBooks(res.data);
    } catch (err) {
      setError('Failed to fetch borrowed books');
    }
  };

  const addBook = async (title, author) => {
    try {
      const res = await api.post('/books', { title, author });
      setBooks(prev => [res.data, ...prev]);
    } catch (err) {
      throw err;
    }
  };

  const issueBook = async (id, issuedTo) => {
    try {
      const res = await api.patch(`/books/${id}/issue`, { issuedTo });
      updateBookInList(res.data.book);
      fetchBorrowedBooks();
    } catch (err) {
      throw err;
    }
  };

  const returnBook = async (id) => {
    try {
      const res = await api.patch(`/books/${id}/return`);
      updateBookInList(res.data.book);
      fetchBorrowedBooks();
    } catch (err) {
      throw err;
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
    } catch (err) {
      throw err;
    }
  };

  const updateBookInList = (updatedBook) => {
    setBooks(prev =>
      prev.map(book => book._id === updatedBook._id ? updatedBook : book)
    );
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();
  }, []);

  return {
    books,
    borrowedBooks,
    loading,
    error,
    addBook,
    issueBook,
    returnBook,
    deleteBook,
  };
};

export default useBooks;