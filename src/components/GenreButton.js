import { useState } from 'react';
import styles from '../styles/GenreQuiz.module.css';

export default function GenreButton(props) {
  const [selected, setSelected] = useState(false);
  const genre = props.genre;

  return (
    <button className={styles.genreButton + ' ' + (selected ? styles.selected : '')} onClick={() => setSelected(!selected)}>
      { genre }
    </button>
  );
}
