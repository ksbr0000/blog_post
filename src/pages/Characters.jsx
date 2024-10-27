import React, { useState, useEffect } from 'react';
import axios from 'axios';
  //Learned how to use useState hook from Youtube 
const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchCharacters = async (page) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(response.data.results);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#e3f2fd', minHeight: '100vh' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Rick and Morty Characters</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {characters.map((character) => (
          <div
            key={character.id}
            style={{
              border: '1px solid #d3d3d3',
              borderRadius: '10px',
              padding: '15px',
              width: '180px',
              backgroundColor: '#fff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s',
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ borderRadius: '10px', width: '100%', marginBottom: '10px' }}
            />
            <h4 style={{ fontSize: '1rem', color: '#007acc' }}>{character.name}</h4>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Status: {character.status}</p>
            <p style={{ fontSize: '0.9rem', color: '#555' }}>Species: {character.species}</p>
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

export default Characters;
