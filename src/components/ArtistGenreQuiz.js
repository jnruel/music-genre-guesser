import { useState, useEffect } from 'react';
import { getRelatedArtists } from '../helper/fetch';
import GenreButton from '../components/GenreButton';
import styles from '../styles/GenreQuiz.module.scss';

export default function ArtistGenreQuiz(props) {
  const artist = props.artist;
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [results, setResults] = useState({
    submitted: false,
    numCorrect: null
  });

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

  // Run whenever the genres state updates,
  // to set selected state.
  useEffect(async () => {
    const selected = genres.filter((obj) => obj.selected === true);
    setSelectedGenres(selected);
  }, [genres]);

  const toggleSelection = (selectedGenre) => {
    // Get index of selected genre
    let selectedIndex = genres.findIndex((genre) => {
      return genre.id === selectedGenre.id;
    });

    let updatedGenres = [...genres];
    updatedGenres[selectedIndex] = selectedGenre;
    setGenres(updatedGenres);
  };

  const submitAnswers = () => {
    if (selectedGenres.length === artist.genres.length) {
      let correct = 0;
      artist.genres.forEach((genre) => {
        selectedGenres.forEach((selectedGenre) => {
          if (selectedGenre.name === genre) {
            correct++;
          }
        });
      });

      setResults({
        submitted: true,
        numCorrect: correct
      });
    }
  }

  return (
    <div className={styles.container}>
      <h2>{artist.name} ({artist.genres.length} genres on Spotify)</h2>
      <img src={artist.images[2].url}></img>
      <h3>Guess the correct Genres</h3>
      <div>Selected {selectedGenres.length} out of {artist.genres.length}</div>
      <div className={styles.genreButtonContainer}>
        {genres.map((genre, index) => {
          // Disable button if at selection max and not already selected
          // (Allow selected to be clicked in order to deselect)
          let disabled = false;
          if (selectedGenres.length === artist.genres.length &&
            (genre.selected === false || results.submitted === true)) {
            disabled = true;
          }

          let answer = false;
          if (artist.genres.includes(genre.name)) {
            answer = true;
          }

          return <GenreButton
                    key={genre.id}
                    genre={genre}
                    toggleSelection={toggleSelection}
                    answer={answer}
                    submitted={results.submitted}
                    disabled={disabled}
                  />
        })}
      </div>

      {selectedGenres.length === artist.genres.length && !results.submitted &&
        <button onClick={submitAnswers}>Submit</button>
      }

      {results.submitted &&
        <div>{`You got ${results.numCorrect} out of ${artist.genres.length} genres correct`}</div>
      }
    </div>
  );
}
