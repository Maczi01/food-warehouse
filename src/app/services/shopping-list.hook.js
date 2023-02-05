import { useEffect, useMemo, useState } from 'react';

import { ShoppingListStore } from './shopping-list.store';

export const useStoppingListStore = () => {
  const store = useMemo(() => ShoppingListStore.getInstance(), []);
  const [state, setState] = useState(store.state);

  useEffect(() => {
    const callback = () => (newState) => {
      setState((oldState) => ({ ...oldState, ...newState }));
    };
    store.addListener(callback);
    return () => {
      store.removeListener(callback);
    };
  }, [store, setState]);

  return { ...store, state };
};
