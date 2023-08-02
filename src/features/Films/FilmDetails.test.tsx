import {
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import { rest } from 'msw';
import { FilmDetails } from '.';
import { renderWithRouter, server } from '@/utils/testUtils';

const apiUrl = process.env.VITE_API_URL;
const filmId = 4;
const filmTitle = 'test title';
const planetIds = [2, 4, 5];
const planetName = 'planet name';

beforeEach(() => {
  server.use(
    rest.get(`${apiUrl}films/${filmId}`, (req, res, ctx) => {
      return res(
        ctx.json({
          title: filmTitle,
          id: filmId,
          poster: 'dummy url',
          planets: planetIds,
        })
        // ctx.delay(1500)
      );
    }),
    rest.get(`${apiUrl}planets/:id`, (req, res, ctx) => {
      return res(
        ctx.json({
          name: `${planetName} ${req.params.id}`,
          id: req.params.id,
        }),
        ctx.status(404)
      );
    })
  );
});

test('Renders film details correctly under happy flow circumstances', async () => {
  renderWithRouter(<FilmDetails />, '/:id', `/${filmId}`);
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i), {
    timeout: 1600,
  });
  expect(
    screen.getByRole('heading', {
      name: filmTitle,
    })
  ).toBeVisible();

  const list = screen.getByRole('list');
  const planetItems = await within(list).findAllByRole('listitem');

  expect(planetItems).toHaveLength(planetIds.length);
  expect(planetItems[0]).toHaveTextContent(`${planetName} ${planetIds[0]}`);

  console.log(screen.debug());
});

test('Alternative way to test the render', async () => {
  renderWithRouter(<FilmDetails />, '/:id', `/${filmId}`);
  await screen.findByRole('heading', {
    name: filmTitle,
  });
});
