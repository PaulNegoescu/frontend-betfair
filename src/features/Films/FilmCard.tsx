import { Link } from 'react-router-dom';
import { Film } from './film';
import styles from './Films.module.css';

export function FilmCard({ film }: { film: Film }) {
  return (
    <article className={styles.card}>
      <Link to={`/films/${film.id}`}>
        <img src={film.poster} alt={`Poster for ${film.title}`} />
        <h1>{film.title}</h1>
      </Link>
    </article>
  );
}
