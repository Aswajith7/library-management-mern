import { useState } from 'react';

const BookForm = ({ onAdd }) => {
  const [title, setTitle]   = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();  // stops page from refreshing

    if (!title.trim() || !author.trim()) {
      alert('Please fill in both fields');
      return;
    }

    onAdd(title, author);  // call the function passed from App.js
    setTitle('');           // clear the form
    setAuthor('');
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ padding: '8px', marginRight: '10px', width: '200px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;