import React from 'react';
import { useParams } from 'react-router-dom';

function CharacterDetail({ characters }) {
  const { characterId } = useParams();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?ts=1&apikey=db3dfe058530ceec4499dfbb6435e687&hash=f86bd8309673411e99b776bbb4cfd6dc`;
        const response = await fetch(url);
        const characterData = await response.json();

        if (!characterData.data || !characterData.data.results.length) {
          throw new Error('Character not found.');
        }

        setSelectedCharacter(characterData.data.results[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [characterId]);

  const [selectedCharacter, setSelectedCharacter] = React.useState(null);

  if (isLoading) {
    return <p>Loading character details...</p>;
  } else if (error) {
    return <p>Error: {error}</p>;
  } else if (!selectedCharacter) {
    return <p>Character not found.</p>;
  }

  const comics = selectedCharacter?.comics?.items?.map((comic) => comic.name);

  return (
    <div>
      <h1>{selectedCharacter.name}</h1>
      <img src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`} alt={selectedCharacter.name} style={{ width: '100%', maxWidth: '700px' }} />
      {selectedCharacter.description &&
        <p style={{ maxWidth: '700px' }}>
          <b>DESCRIPTION:</b> {selectedCharacter.description}
        </p>
      }
      <p><b>COMICS:</b></p>
      <ul>
        {comics.map((comic) => (
          <li key={comic}>{comic}</li>
        ))}
      </ul>

    </div>
  );
}

export default CharacterDetail;
