const BorrowedList = ({ borrowedBooks }) => {

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #f5c6cb', borderRadius: '8px', backgroundColor: '#fff8f8' }}>

      <h2 style={{ margin: '0 0 16px 0', color: '#c0392b' }}>
        📋 Currently Borrowed Books ({borrowedBooks.length})
      </h2>

      {borrowedBooks.length === 0 ? (
        <p style={{ color: '#888', margin: 0 }}>
          ✅ No books are currently borrowed.
        </p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5c6cb', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>👤 Borrower</th>
              <th style={{ padding: '10px' }}>📖 Book</th>
              <th style={{ padding: '10px' }}>✍️ Author</th>
              <th style={{ padding: '10px' }}>📅 Issued On</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book, index) => (
              <tr
                key={book._id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#fff0f0', borderBottom: '1px solid #f5c6cb' }}
              >
                <td style={{ padding: '10px', fontWeight: 'bold' }}>{book.issuedTo}</td>
                <td style={{ padding: '10px' }}>{book.title}</td>
                <td style={{ padding: '10px', color: '#666' }}>{book.author}</td>
                <td style={{ padding: '10px', color: '#888', fontSize: '13px' }}>{formatDate(book.issuedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowedList;