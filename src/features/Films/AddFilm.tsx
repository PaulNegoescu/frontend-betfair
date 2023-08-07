import { Input, Typeahead } from '@/components';
import { getApi } from '@/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { array, number, object, string } from 'yup';
import { Character } from './film';

const { read: getCharacters } = getApi('characters');

const addFilmSchema = object({
  title: string().required(),
  director: string().required(),
  producer: string().required(),
  poster: string().url().required(),
  release_date: string().required(),
  opening_crawl: string().required(),
  episode_id: number().min(1).required(),
  characters: array().required(),
});

export function AddFilm() {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  useEffect(() => {
    getCharacters().then((data) => setCharacters(data));
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addFilmSchema),
  });
  return (
    <>
      <h2>Add a new one</h2>
      <form className="brandForm" onSubmit={handleSubmit(console.log)}>
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
            control={control}
            errors={errors}
            options={characters.map((ch) => ({
              label: ch.name,
              id: String(ch.id),
            }))}
          />
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
