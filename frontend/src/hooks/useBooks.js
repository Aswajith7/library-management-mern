import { useState, useEffect } from 'react';
import api from '../api';

const useBooks = () => {
  const [books, setBooks]               = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);  // ← NEW
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [message, setMessage]           = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/books');
      setBooks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // ← NEW: fetch borrowed books
  const fetchBorrowedBooks = async () => {
    try {
      const res = await api.get('/books/borrowed');
      setBorrowedBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch borrowed books');
    }
  };

  const addBook = async (title, author) => {
    try {
      const res = await api.post('/books', { title, author });
      setBooks(prev => [res.data, ...prev]);
      setMessage(`✅ "${res.data.title}" added successfully!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      return err.response?.data?.error || 'Failed to add book';
    }
  };

  const issueBook = async (id, issuedTo) => {
    try {
      const res = await api.patch(`/books/${id}/issue`, { issuedTo });
      updateBookInList(res.data.book);
      await fetchBorrowedBooks();  // ← refresh borrowed list
      setMessage(`✅ Book issued to ${issuedTo}!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      return err.response?.data?.error || 'Failed to issue book';
    }
  };

  const returnBook = async (id) => {
    try {
      const res = await api.patch(`/books/${id}/return`);
      updateBookInList(res.data.book);
      await fetchBorrowedBooks();  // ← refresh borrowed list
      setMessage('✅ Book returned successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      return err.response?.data?.error || 'Failed to return book';
    }
  };

  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/${id}`);
      setBooks(prev => prev.filter(b => b._id !== id));
      setMessage('✅ Book deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      return err.response?.data?.error || 'Failed to delete book';
    }
  };

  const updateBookInList = (updatedBook) => {
    setBooks(prev =>
      prev.map(b => b._id === updatedBook._id ? updatedBook : b)
    );
  };

  useEffect(() => {
    fetchBooks();
    fetchBorrowedBooks();  // ← fetch both on load
  }, []);

  return {
    books, borrowedBooks, loading, error, message,
    addBook, issueBook, returnBook, deleteBook
  };
};

export default useBooks;