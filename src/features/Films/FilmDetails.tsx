import { useParams } from 'react-router';
import { useFilms } from './useFilms';

import styles from './Films.module.css';

export function FilmDetails() {
  const { id } = useParams();
  const [film, planets] = useFilms(id || '1');

  if (!id) {
    return (
      <div>
        An error ocurred please navigate back and click a film to continue.
      </div>
    );
  }

  if (!film) {
    return <div>Loading ...</div>;
  }

  return (
    <article className={styles.filmDetails}>
      <img src={film.poster} alt={`Poster for ${film.title}`} />
      <div>
        <h1>{film.title}</h1>
        <p>{film.opening_crawl}</p>
      </div>
      <div>
        <h2>Planets</h2>
        <ul>
          {planets?.map((planet) => (
            <li key={planet.id}>{planet.name}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
