import { NavLink, NavLinkProps } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Nav.module.css';
import { useAuth } from '@/features';

function BrandNavLink({ children, ...props }: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => clsx({ [styles.active]: isActive })}
    >
      {children}
    </NavLink>
  );
}

export function Nav() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.nav}>
      <menu>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">Counter</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="todos">Todos</BrandNavLink>
        </li>

        {user && (
          <>
            <li className={styles.pushRight}>
              Welcome, {user.firstName}!{' '}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </a>
            </li>
          </>
        )}

        {!user && (
          <>
            <li className={styles.pushRight}>
              <BrandNavLink to="login">Login</BrandNavLink>
            </li>
            <li>
              <BrandNavLink to="register">Register</BrandNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
