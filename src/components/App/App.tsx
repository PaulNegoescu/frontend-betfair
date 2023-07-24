import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  Auth,
  Counter,
  NotFound,
  Todos,
  AuthContextProvider,
  AuthGuard,
} from '@/features';
import { StandardLayout } from '@/components';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<StandardLayout />}>
            <Route index element={<h1>Homepage</h1>} />
            <Route
              path="counter"
              element={<Counter initialCount={5} step={3} />}
            />
            <Route
              path="todos"
              element={
                <AuthGuard>
                  <Todos />
                </AuthGuard>
              }
            />
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
