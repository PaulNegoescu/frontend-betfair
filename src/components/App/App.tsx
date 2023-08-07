import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Nav } from '@/components';
import { AuthContextProvider, Auth, FilmsLayout } from '@/features';

import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/open-sans';
import './App.css';

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Navigate to="/films" />} />
          <Route path="/films/*" element={<FilmsLayout />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </AuthContextProvider>
  );
}
