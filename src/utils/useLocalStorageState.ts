import { useCallback, useState } from 'react';

function setStorage<T>(key: string, data: T) {
  window?.localStorage.setItem(key, JSON.stringify(data));
}

export function useLocalStorageState<S>(
  key: string,
  initialState: S | (() => S)
): [S, (newState: S | ((oldState: S) => S)) => void] {
  const [state, setState] = useState<S>(() => {
    const inStorage = window?.localStorage.getItem(key);
    let defaultState: S;
    if (inStorage) {
      const parsedStorage = JSON.parse(inStorage);
      defaultState = parsedStorage;
    } else {
      if (typeof initialState === 'function') {
        defaultState = (initialState as () => S)();
      } else {
        defaultState = initialState;
      }
      setStorage(key, defaultState);
    }

    return defaultState;
  });

  type NewState = S | ((oldState: S) => S);
  const updateState = useCallback(
    (newState: NewState): void => {
      setState((oldState) => {
        let state: S;
        if (typeof newState === 'function') {
          state = (newState as (oldState: S) => S)(oldState);
        } else {
          state = newState;
        }

        setStorage(key, state);
        return state;
      });
    },
    [key]
  );

  return [state, updateState];
}
