import useBooks from './hooks/useBooks';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BorrowedList from './components/BorrowedList';

function App() {
  const {
    books,
    borrowedBooks,
    addBook,
    issueBook,
    returnBook,
    deleteBook,
  } = useBooks();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>📚 Library Management System</h1>
      <BookForm onAdd={addBook} />
      <BorrowedList borrowedBooks={borrowedBooks} />
      <BookList
        books={books}
        onIssue={issueBook}
        onReturn={returnBook}
        onDelete={deleteBook}
      />
    </div>
  );
}

export default App;