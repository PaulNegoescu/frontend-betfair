import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '..';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!user) {
      // redirect the user
      navigate('/login', {
        state: { from: pathname },
      });
    }
  }, [navigate, pathname, user]);

  if (!user) {
    return null;
  }

  return children;
}
