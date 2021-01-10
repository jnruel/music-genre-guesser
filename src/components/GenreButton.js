import styles from '../styles/GenreQuiz.module.scss';

export default function GenreButton(props) {
  const genre = JSON.parse(JSON.stringify(props.genre));

  const handleClick = () => {
    genre.selected = !genre.selected;
    props.toggleSelection(genre);
  }

  return (
    <button
      className={styles.genreButton + ' ' + (genre.selected ? styles.selected : '')}
      onClick={handleClick}
      disabled={props.disabled}
    >
      { genre.name }
    </button>
  );
}
