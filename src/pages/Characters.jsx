import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      setError('');

      const postResponse = await axios.get(`https://dummyjson.com/posts?limit=5&skip=${(page - 1) * 5}`);
      const imageResponse = await axios.get(`https://dummyjson.com/products?limit=5&skip=${(page - 1) * 5}`);
      
      const postsWithImages = postResponse.data.posts.map((post, index) => ({
        ...post,
        image: imageResponse.data.products[index]?.thumbnail,
        timestamp: new Date().toLocaleDateString(),
      }));

      setPosts(postsWithImages);
    } catch (err) {
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Blog Posts</h2>
      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.postsContainer}>
        {posts.map((post) => (
          <div key={post.id} style={styles.postCard}>
            {post.image && <img src={post.image} alt={post.title} style={styles.image} />}
            <h4 style={styles.title}>{post.title}</h4>
            <p style={styles.content}>{post.body}</p>
            <small style={styles.timestamp}>Published on: {post.timestamp}</small>
          </div>
        ))}
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={handlePrevious} disabled={page === 1} style={{ ...styles.button, opacity: page === 1 ? 0.5 : 1 }}>
          Previous
        </button>
        <button onClick={handleNext} style={styles.button}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '2rem',
    color: '#333',
    textAlign: 'center',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'red',
  },
  postsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
  },
  postCard: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '15px',
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '10px',
  },
  content: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '10px',
  },
  timestamp: {
    fontSize: '0.85rem',
    color: '#aaa',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};

export default BlogPosts;
