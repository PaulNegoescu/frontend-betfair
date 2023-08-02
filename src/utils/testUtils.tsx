import { RenderOptions, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/node';

export const server = setupServer();
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export function renderWithRouter(
  ui: React.ReactNode,
  path = '/',
  route = '/',
  options?: RenderOptions
) {
  const component = (
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );

  return {
    user: userEvent.setup(),
    ...render(component, options),
  };
}
