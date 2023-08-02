import { useEffect, useState } from 'react';
import { Film, Planet } from './film';
import { getApi } from '@/utils';
import { toast } from 'react-toastify';

const { read: getFilmList, readOne: getFilm } = getApi('films');
const { readOne: getPlanet } = getApi('planets');

export function useFilms(): Film[] | null;
export function useFilms(id: string): [Film | null, Planet[] | null];
export function useFilms(id?: string) {
  const [films, setFilms] = useState<Film[] | null>(null);
  const [film, setFilm] = useState<Film | null>(null);
  const [planets, setPlanets] = useState<Planet[] | null>(null);

  useEffect(() => {
    async function getMovies() {
      if (!id) {
        const data = await getFilmList();
        setFilms(data);
      } else {
        const data = await getFilm(id).catch((e) => {
          toast.error(
            typeof e.message === 'string'
              ? e.message
              : 'Something went wrong, please try again'
          );
          return null;
        });
        console.log(data);

        setFilm(data);
      }
    }

    getMovies();
  }, [id]);

  useEffect(() => {
    async function getPlanets() {
      if (!film) {
        return;
      }
      const planetPromises: Promise<Planet>[] = film.planets.map((planetId) =>
        getPlanet(planetId)
      );
      const planets = await Promise.all(planetPromises);
      // data.planetList = planets;
      setPlanets(planets);
    }
    getPlanets();
  }, [film]);

  if (id) {
    return [film, planets];
  } else {
    return films;
  }
}
