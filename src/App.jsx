import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import BrowseCharacters from './components/BrowseCharacters';
import Comics from './components/Comics';
import CharacterDetail from './components/CharacterDetail';
import NotFound from './components/NotFound';
import './App.css'

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Iron&ts=1&apikey=db3dfe058530ceec4499dfbb6435e687&hash=f86bd8309673411e99b776bbb4cfd6dc');
      const data = await response.json();
      setCharacters(data.data.results);
    };

    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <NavLink className='navLink' to="/">Home</NavLink>
        <NavLink to="/browse-characters" activeClassName="active">
          Browse Characters
        </NavLink>
        <NavLink className='navLink' to="/comics">Comics</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-characters" element={<BrowseCharacters characters={characters} />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/characters/:characterId" element={<CharacterDetail characters={characters} />}
        />
       <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
