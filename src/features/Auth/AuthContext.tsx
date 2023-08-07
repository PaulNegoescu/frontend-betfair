import { useLocalStorageState } from '@/utils';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface ContextType {
  user: User | null;
  token: string | null;
  login: (data: { user: User; accessToken: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<ContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useLocalStorageState<User | null>('user', null);
  const [token, setToken] = useLocalStorageState<string | null>('token', null);

  const login = useCallback(
    ({ user, accessToken }: { user: User; accessToken: string }) => {
      setUser(user);
      setToken(accessToken);
    },
    [setToken, setUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, [setUser, setToken]);

  const value = useMemo(
    () => ({ user, token, login, logout }),
    [user, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === null) {
    throw new Error(
      'The useAuth hook needs to be used in a descendant of AuthContextProvider.'
    );
  }

  return ctx;
}
