import { useParams } from 'react-router';
import { useFilms } from './useFilms';
import { Film, Planet } from './film';

import styles from './Films.module.css';

export function FilmDetails() {
  const { id } = useParams();
  const [film, planets] = useFilms(id) as [Film, Planet[]];

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
