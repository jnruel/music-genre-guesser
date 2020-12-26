import { useState, useEffect } from 'react';
import { getRelatedArtists } from '../helper/fetch';
import GenreButton from '../components/GenreButton';
import styles from '../styles/GenreQuiz.module.css';

export default function ArtistGenreQuiz(props) {
  const artist = props.artist;
  const [genres, setGenres] = useState([]);

  // Call every time artist gets updated.
  useEffect(async () => {
    const relatedArtists = await getRelatedArtists(props.accessToken, artist.id);
    let relatedGenres = [...artist.genres];

    // Loop related artists, extract unique genres
    relatedArtists.forEach((relatedArtist) => {
      if (relatedArtist.genres.length > 0) {
        relatedArtist.genres.forEach((genre) => {
          if (!relatedGenres.includes(genre)) {
            relatedGenres.push(genre);
          }
        });
      }
    });

    // Update state
    setGenres(relatedGenres.sort());
  }, [artist]);

  return (
    <div className={styles.container}>
      <h2>{artist.name} ({artist.genres.length} genres)</h2>
      <img src={artist.images[2].url}></img>

      <h3>Available Genres</h3>
      <div>
        {genres.map((genre, index) => {
          const key = artist.name.replace(' ', '_') + '_' + index;
          return <GenreButton key={key} genre={genre}/>
        })}
      </div>
    </div>
  );
}
