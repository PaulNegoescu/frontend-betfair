import { useEffect, useState } from 'react';
import { Film, Planet } from './film';
import { getApi } from '@/utils';

const { read: getFilmList, readOne: getFilm } = getApi('films');
const { readOne: getPlanet } = getApi('planets');

export function useFilms(id?: string) {
  const [films, setFilms] = useState<Film[] | Film | null>(null);
  const [planets, setPlanets] = useState<Planet[] | null>(null);

  useEffect(() => {
    async function getMovies() {
      let data: Film[] | Film;
      if (!id) {
        data = await getFilmList();
      } else {
        data = (await getFilm(id)) as Film;
      }
      setFilms(data);
    }

    getMovies();
  }, [id]);

  useEffect(() => {
    async function getPlanets() {
      const planetPromises: Promise<Planet>[] = (films as Film).planets.map(
        (planetId) => getPlanet(planetId)
      );
      const planets = await Promise.all(planetPromises);
      // data.planetList = planets;
      setPlanets(planets);
    }

    films && getPlanets();
  }, [films]);

  return [films, planets];
}
