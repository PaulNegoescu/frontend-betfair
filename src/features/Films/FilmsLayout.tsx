import { Route, Routes } from 'react-router-dom';
import { FilmDetails } from './FilmDetails';
import { FilmsList } from './FilmsList';
import { AddFilm } from './AddFilm';
import { EditFilm } from './EditFilm';

export function FilmsLayout() {
  return (
    <>
      <h1>Films</h1>
      <Routes>
        <Route index element={<FilmsList />} />
        <Route path=":id" element={<FilmDetails />} />
        <Route path=":id/edit" element={<EditFilm />} />
        <Route path="add" element={<AddFilm />} />
      </Routes>
    </>
  );
}
