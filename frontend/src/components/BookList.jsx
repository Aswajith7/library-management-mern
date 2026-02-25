import BookCard from './BookCard';

const BookList = ({ books, onIssue, onReturn, onDelete }) => {
  if (books.length === 0) {
    return <p>No books in the library yet. Add one above!</p>;
  }

  return (
    <div>
      <h2>All Books ({books.length})</h2>
      {books.map(book => (
        <BookCard
          key={book._id}
          book={book}
          onIssue={onIssue}
          onReturn={onReturn}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default BookList;