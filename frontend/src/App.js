import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("Both fields are required");
    await axios.post('http://localhost:5000/api/notes', { title, content });
    setTitle('');
    setContent('');
    fetchNotes();
  };

  return (
    <div className="container py-5">
      <div className="bg-light p-5 rounded shadow-sm">
        <h2 className="text-center mb-4">📝 Notes App</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              rows="3"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" type="submit">➕ Add Note</button>
          </div>
        </form>

        <h4 className="mb-3">📋 Saved Notes</h4>
        {notes.length === 0 && (
          <p className="text-muted">No notes yet.</p>
        )}
        {notes.map((note, idx) => (
          <div key={idx} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{note.title}</h5>
              <p className="card-text">{note.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
