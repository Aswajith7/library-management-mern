const BookCard = ({ book, onIssue, onReturn, onDelete }) => {

  const handleIssue = () => {
    const name = prompt('Enter the name of the person:');
    if (name && name.trim()) {
      onIssue(book._id, name.trim());
    }
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: book.isIssued ? '#fff3f3' : '#f3fff3'
    }}>

      {/* Book Info */}
      <h3 style={{ margin: '0 0 8px 0' }}>{book.title}</h3>
      <p style={{ margin: '0 0 8px 0', color: '#666' }}>by {book.author}</p>

      {/* Status */}
      <p style={{ margin: '0 0 12px 0' }}>
        Status: {book.isIssued
          ? <span style={{ color: 'red' }}>❌ Issued to {book.issuedTo}</span>
          : <span style={{ color: 'green' }}>✅ Available</span>
        }
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {book.isIssued ? (
          <button
            onClick={() => onReturn(book._id)}
            style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ↩️ Return
          </button>
        ) : (
          <button
            onClick={handleIssue}
            style={{ padding: '6px 12px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            📖 Issue
          </button>
        )}

        <button
          onClick={() => onDelete(book._id)}
          style={{ padding: '6px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;