import clsx from 'clsx';
import { useReducer } from 'react';

import styles from './Counter.module.css';

interface ValidActions {
  type: 'decrement' | 'increment' | 'reset';
  payload: number;
}

function counterReducer(oldCount: number, { type, payload }: ValidActions) {
  let newCount = oldCount;
  switch (type) {
    case 'decrement':
      newCount -= payload;
      break;
    case 'increment':
      newCount += payload;
      break;
    case 'reset':
      newCount = payload;
      break;
    default:
      throw new Error(`Action "${type}" is not handled in the code!`);
  }
  return newCount;
}

// const o = { prop: 5 };
// const { prop = 3 }: { prop?: number } = o;
// Counter({initialCount: 0, step: 1});

export function Counter({ initialCount = 0, step = 1 }) {
  const [count, dispatchCountChange] = useReducer(counterReducer, initialCount);

  return (
    <div className={styles.container}>
      <h1>Counter</h1>
      <output
        style={{ '--fw': 'bold' } as object}
        className={clsx({
          [styles.negative]: count < 0,
          [styles.positive]: count > 0,
        })}
      >
        {count}
      </output>
      <p>
        <button
          onClick={() =>
            dispatchCountChange({ type: 'decrement', payload: step })
          }
        >
          -
        </button>
        <button
          onClick={() =>
            dispatchCountChange({ type: 'reset', payload: initialCount })
          }
        >
          Reset
        </button>
        <button
          onClick={() =>
            dispatchCountChange({ type: 'increment', payload: step })
          }
        >
          +
        </button>
      </p>
    </div>
  );
}

// let state;
// function myUseState(initialState) {
//   if (state === undefined) {
//     state = initialState;
//   }

//   function setState(newState) {
//     state = newState;
//     if (newState !== state) {
//       App();
//     }
//   }

//   return [state, setState];
// }
