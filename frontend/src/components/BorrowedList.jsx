function BorrowedList({ borrowedBooks }) {
  if (borrowedBooks.length === 0) {
    return <p>No books currently borrowed.</p>;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h2>Borrowed Books</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Borrower</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Book</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Author</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map(book => (
            <tr key={book._id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.issuedTo}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.title}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowedList;