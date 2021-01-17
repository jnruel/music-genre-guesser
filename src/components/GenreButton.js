import classNames from 'classnames/bind';
import styles from '../styles/GenreQuiz.module.scss';


export default function GenreButton(props) {
  const genre = JSON.parse(JSON.stringify(props.genre));


  let answer;
  if (props.submitted) {
    answer = props.answer;
  }

  let classes = classNames(
    styles.genreButton,
    {
      [styles.selected]: genre.selected,
      [styles.answer]: answer
    }
  );

  const handleClick = () => {
    genre.selected = !genre.selected;
    props.toggleSelection(genre);
  }

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={props.disabled}
    >
      { genre.name }
    </button>
  );
}
