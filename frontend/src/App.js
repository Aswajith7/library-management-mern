import useBooks from './hooks/useBooks';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BorrowedList from './components/BorrowedList';  // ← ADD

function App() {
  const {
    books, borrowedBooks, loading, error, message,
    addBook, issueBook, returnBook, deleteBook
  } = useBooks();

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Arial', padding: '0 20px' }}>
      <h1>📚 Library Management System</h1>

      {message && (
        <p style={{ backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '6px', color: 'green' }}>
          {message}
        </p>
      )}

      <BookForm onAdd={addBook} />

      {/* ← ADD borrowed list here */}
      <BorrowedList borrowedBooks={borrowedBooks} />

      {loading && <p>⏳ Loading books...</p>}
      {error   && <p style={{ color: 'red' }}>❌ {error}</p>}

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