import { Input, Typeahead } from '@/components';
import { getApi } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { array, number, object, string } from 'yup';
import { Character, Planet } from './film';
import { useParams } from 'react-router-dom';

const { readOne: getFilm } = getApi('films');
const { read: getCharacters } = getApi('characters');
const { read: getPlanets } = getApi('planets');

const editFilmSchema = object({
  title: string().required(),
  director: string().required(),
  producer: string().required(),
  poster: string().url().required(),
  release_date: string().required(),
  opening_crawl: string().required(),
  episode_id: number().min(1).required(),
  characters: array(string()).min(1),
});

export function EditFilm() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
    getPlanets().then((data) => setPlanets(data));
  }, []);
  const { id } = useParams();

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: yupResolver(editFilmSchema),
    defaultValues: () => getFilm(Number(id)),
  });

  function onSubmit(data: any) {
    console.log(data);

    // const send2Server = { ...data };
    // send2Server.characters = send2Server.characters.map(
    //   (ch: { label: string; id: string }) => Number(ch.id)
    // );
  }

  // if (!film) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <>
      <h2>Edit "{defaultValues?.title}"</h2>
      <form className="brandForm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          type="text"
          label="Title"
          register={register}
          errors={errors}
        />
        <Input
          name="episode_id"
          type="number"
          label="Episode Number"
          register={register}
          errors={errors}
        />
        <Input
          name="opening_crawl"
          type="text"
          label="Opening Crawl"
          register={register}
          errors={errors}
        />
        <Input
          name="director"
          type="text"
          label="Director"
          register={register}
          errors={errors}
        />
        <Input
          name="producer"
          type="text"
          label="Producer"
          register={register}
          errors={errors}
        />
        <Input
          name="poster"
          type="url"
          label="Poster"
          register={register}
          errors={errors}
        />
        <Input
          name="release_date"
          type="date"
          label="Release Date"
          register={register}
          errors={errors}
        />
        {characters && (
          <Typeahead
            name="characters"
            label="Characters"
            register={register}
            unregister={unregister}
            defaultValues={defaultValues}
            errors={errors}
            options={characters.map((ch) => ({
              label: ch.name,
              id: String(ch.id),
            }))}
          />
        )}
        <div>Planets</div>
        <div>
          {planets?.map((planet) => (
            <label key={planet.id}>
              <input
                type="checkbox"
                value={planet.id}
                {...register(`planets`)}
                defaultChecked={defaultValues?.planets.includes(planet.id)}
              />
              {planet.name}
            </label>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
