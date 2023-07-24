import clsx from 'clsx';
import { FilmCard } from './FilmCard';
import { useFilms } from './useFilms';

import styles from './Films.module.css';

export function FilmsList() {
  const films = useFilms();

  return (
    <section className={clsx(styles.filmsList, 'constrainedWrapper')}>
      {films?.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </section>
  );
}
