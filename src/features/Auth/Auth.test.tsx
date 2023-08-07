import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { Auth } from './Auth';
import { renderWithRouter, server } from '@/utils/testUtils';
import { AuthContextProvider } from '..';

const apiUrl = 'http://localhost:3000/';

test('Users can login', async () => {
  const data = {
    email: 'a@a.com',
    password: 'parola',
  };

  server.use(
    rest.post(`${apiUrl}login`, (req, res, ctx) => {
      const reqBody = req.json();

      if (!reqBody.email || !reqBody.password) {
        return res(ctx.status(400), ctx.json('Password required'));
      }

      return res(
        ctx.json({
          user: {
            firstName: 'John',
            lastName: 'Tester',
            id: 1,
            ...reqBody,
          },
          authToken: 'token',
        })
      );
    })
  );

  const { user } = renderWithRouter(
    <AuthContextProvider>
      <Auth />
    </AuthContextProvider>
  );

  const emailInput = await screen.findByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, data.email);
  // await user.type(passwordInput, data.password);

  expect(emailInput).toHaveValue(data.email);
  await user.click(screen.getByRole('button', { name: /login/i }));

  console.log(screen.debug());

  // await screen.findByRole('heading', { name: /films/i });
});
