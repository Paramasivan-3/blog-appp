
import React, { useState, useEffect } from 'react';
import './App.css';

interface Post {
  id: number;
  title: string;
  content: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');

  const fetchPosts = async () => {
    const response = await fetch('http://localhost:5000/posts');
    const data = await response.json();
    setPosts(data);
  };

  const addPost = async () => {
    if (newTitle.trim() === '' || newContent.trim() === '') return;
    await fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    setNewTitle('');
    setNewContent('');
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    await fetch(`http://localhost:5000/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>My Blog</h1>
      <div>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Content"
        />
        <button onClick={addPost}>Add Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;