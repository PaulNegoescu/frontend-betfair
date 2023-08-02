import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { FilmsList, FilmDetails } from '@/features';

import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/open-sans';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilmsList />} />
        <Route path="/films/:id" element={<FilmDetails />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
