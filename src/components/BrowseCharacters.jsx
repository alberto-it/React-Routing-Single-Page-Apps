import React from 'react';
import { Link } from 'react-router-dom';

const BrowseCharacters = ({ characters }) => {
  return (
    <div>
      <h2>Browse Iron Characters...</h2>
      {characters.map((character) => (
        <div key={character.id}>
          <h3>
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default BrowseCharacters;