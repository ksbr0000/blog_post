import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Characters from './pages/Characters';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Dogs from './pages/Dogs';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/dogs" element={<Dogs />} />
      </Routes>
    </Router>
  );
}

export default App;
