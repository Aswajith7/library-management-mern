import BookCard from './BookCard';

function BookList({ books, onIssue, onReturn, onDelete }) {
  if (books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div>
      <h2>All Books</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
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
    </div>
  );
}

export default BookList;