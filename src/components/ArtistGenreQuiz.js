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

    // alpha sort
    relatedGenres.sort();

    // Loop genres and transform into objects for selected state manangement
    let genreObjects = [];
    relatedGenres.forEach((genre, index) => {
      let obj = {
        id: `${artist.id}_${index}`,
        name: genre,
        selected: false
      };

      genreObjects.push(obj);
    });

    // Update state
    setGenres(genreObjects);
  }, [artist]);

  const toggleSelection = (selectedGenre) => {
    // Get index of selected genre
    let selectedIndex = genres.findIndex((genre) => {
      return genre.id === selectedGenre.id;
    });

    let updatedGenres = [...genres];
    updatedGenres[selectedIndex] = selectedGenre;
    setGenres(updatedGenres);
  };

  return (
    <div className={styles.container}>
      <h2>{artist.name} ({artist.genres.length} genres)</h2>
      <img src={artist.images[2].url}></img>

      <h3>Available Genres</h3>
      <div>
        {genres.map((genre, index) => {
          return <GenreButton key={genre.id} genre={genre} toggleSelection={toggleSelection} />
        })}
      </div>
    </div>
  );
}
