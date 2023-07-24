import { Outlet } from 'react-router-dom';
import { Nav } from '@/components';

export function StandardLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
