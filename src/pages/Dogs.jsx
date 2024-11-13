import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchUsers = async (page) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=30`);
      setUsers(response.data.results);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Random Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #d3d3d3',
              borderRadius: '10px',
              padding: '15px',
              width: '220px',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={user.picture.large}
              alt={`${user.name.first} ${user.name.last}`}
              style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '10px' }}
            />
            <h4 style={{ fontSize: '1rem', color: '#007acc' }}>{`${user.name.first} ${user.name.last}`}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Email: {user.email}</p>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>
              Location: {`${user.location.city}, ${user.location.country}`}
            </p>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          style={{
            backgroundColor: '#61dafb',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
            marginRight: '10px',
            opacity: page === 1 ? 0.6 : 1,
          }}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{
            backgroundColor: '#61dafb',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
