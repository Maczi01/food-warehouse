import { useEffect, useMemo, useState } from 'react';

import { InventoryStore } from './inventory.store';

export const useInventory = () => {
  const store = useMemo(() => InventoryStore.getInstance(), []);
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
