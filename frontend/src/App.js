import { useState, useEffect } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

// Base URL of our backend
const API = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setBooks(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  const addBook = async (title, author) => {
    try {
      const res = await axios.post(API, { title, author });
      setBooks([res.data, ...books]); // add to top of list
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add book');
    }
  };

  // Issue a book
  const issueBook = async (id, issuedTo) => {
    try {
      const res = await axios.patch(`${API}/${id}/issue`, { issuedTo });
      updateBookInList(res.data.book);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to issue book');
    }
  };

  // Return a book
  const returnBook = async (id) => {
    try {
      const res = await axios.patch(`${API}/${id}/return`);
      updateBookInList(res.data.book);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to return book');
    }
  };

  // Delete a book
  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setBooks(books.filter(b => b._id !== id)); // remove from list
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete book');
    }
  };

  // Helper — update one book in the list without refetching all
  const updateBookInList = (updatedBook) => {
    setBooks(books.map(b => b._id === updatedBook._id ? updatedBook : b));
  };

  // Fetch books when app first loads
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Arial', padding: '0 20px' }}>
      <h1>📚 Library Management System</h1>

      <BookForm onAdd={addBook} />

      {loading && <p>Loading books...</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <BookList
          books={books}
          onIssue={issueBook}
          onReturn={returnBook}
          onDelete={deleteBook}
        />
      )}
    </div>
  );
}

export default App;