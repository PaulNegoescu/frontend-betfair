import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { FilmsList, FilmDetails } from '@/features';

import '@fontsource/open-sans';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/films/:id" element={<FilmDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
