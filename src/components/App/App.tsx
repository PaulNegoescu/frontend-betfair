import { Counter } from '../../features';

export function App() {
  return (
    <>
      <Counter />
      <Counter initialCount={5} step={3} />
    </>
  );
}
