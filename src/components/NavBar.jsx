import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav style={{color:'#00ffae'}}>
    <Link style={{color:'#00ffae'}}  to="/">Home</Link> | <Link style={{color:'#00ffae'}} to="/characters">Characters</Link>
  </nav>
);

export default NavBar;
