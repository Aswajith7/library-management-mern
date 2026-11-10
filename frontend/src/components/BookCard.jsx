import { useState } from 'react';

function BookCard({ book, onIssue, onReturn, onDelete }) {
  const [issuing, setIssuing] = useState(false);
  const [borrowerName, setBorrowerName] = useState('');
  const [error, setError] = useState(null);

  const handleIssueSubmit = async () => {
    try {
      await onIssue(book._id, borrowerName);
      setIssuing(false);
      setBorrowerName('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to issue book');
    }
  };

  const handleReturn = async () => {
    try {
      await onReturn(book._id);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to return book');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await onDelete(book._id);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete book');
      }
    }
  };

  return (
    <div style={{
      padding: '15px',
      marginBottom: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: book.isIssued ? '#ffe0e0' : '#e0ffe0',
        width: '220px'
    }}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Status: {book.isIssued ? `Issued to ${book.issuedTo}` : 'Available'}</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!book.isIssued && !issuing && (
        <button onClick={() => setIssuing(true)}>Issue</button>
      )}

      {issuing && (
        <div>
          <input
            type="text"
            placeholder="Borrower name"
            value={borrowerName}
            onChange={(e) => setBorrowerName(e.target.value)}
          />
          <button onClick={handleIssueSubmit}>Confirm</button>
          <button onClick={() => setIssuing(false)}>Cancel</button>
        </div>
      )}

      {book.isIssued && (
        <button onClick={handleReturn}>Return</button>
      )}

      <button
        onClick={handleDelete}
        style={{ marginLeft: '10px', color: 'red' }}
      >
        Delete
      </button>
    </div>
  );
}

export default BookCard;