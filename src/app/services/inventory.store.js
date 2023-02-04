import { useEffect, useMemo, useState } from 'react';

import { getAuth } from '../shared/utils/auth';
import { InventoryService } from './inventory.service';

export class InventoryStore {
  static instance = null;
  api;
  state = {
    inventory: [],
  };
  callbacks = [];
  initialize = false;

  constructor(api) {
    this.api = api;
  }

  static getInstance = () => {
    if (!InventoryStore.instance) {
      InventoryStore.instance = new InventoryStore(new InventoryService());
    }
    return InventoryStore.instance;
  };

  onInventoryUpdate = (inventory) => {
    this.state = { ...this.state, inventory: inventory ? inventory : [] };
    this.callbacks.forEach((callback) => callback()(this.state.inventory));
  };

  addListener = (callback) => {
    this.callbacks.push(callback);
  };

  removeListener = (callback) => {
    const index = this.callbacks.findIndex(callback);
    this.callbacks.splice(index, 1);
  };

  increaseQuantity = (item) => {
    if (item.currentQuantity < parseInt(item.maximalQuantity)) {
      return this.api.update({ ...item, currentQuantity: parseInt(item.currentQuantity) + 1 }).then((response) => {
        return this.getForCurrentUser().then(() => {
          return response;
        });
      });
    }
    return Promise.reject({ Error: 'Cannot update quantity' });
  };

  decreaseQuantity = (item) => {
    if (item.currentQuantity > 0) {
      return this.api.update({ ...item, currentQuantity: parseInt(item.currentQuantity) - 1 }).then((response) => {
        return this.getForCurrentUser().then(() => {
          return response;
        });
      });
    }
    return Promise.reject({ Error: 'Cannot update quantity' });
  };

  deleteItem = (id) => {
    return this.api.delete(id).then((response) => {
      return this.getForCurrentUser().then(() => {
        return response;
      });
    });
  };

  addItem = (item) => {
    return this.api.create(item).then((response) => {
      return this.getForCurrentUser().then(() => {
        return response;
      });
    });
  };

  editItem = (item) => {
    return this.api.update(item).then((response) => {
      return this.getForCurrentUser().then(() => {
        return response;
      });
    });
  };

  getByUser = (userId) => {
    return this.api
      .getMany()
      .then((snapshot) => {
        const foodListData = [];
        if (snapshot && snapshot.docs && snapshot.docs.length) {
          snapshot.docs.forEach((doc) => foodListData.push({ ...doc.data(), id: doc.id }));
        }

        return foodListData.filter((doc) => {
          return doc.userUid === userId;
        });
      })
      .then((inventory) => {
        this.onInventoryUpdate(inventory);
      });
  };
  getForCurrentUser = () => {
    return this.getByUser(getAuth().currentUser ? getAuth().currentUser.uid : null);
  };
}

export const useInventory = () => {
  const inventoryStore = useMemo(() => InventoryStore.getInstance());
  const [state, setState] = useState(() => inventoryStore.state);
  useEffect(() => {
    const callback = () => (inventory) => {
      setState({ inventory: inventory });
    };
    inventoryStore.addListener(callback);
    return () => {
      inventoryStore.removeListener(callback);
    };
  }, [inventoryStore, setState]);
  return { ...inventoryStore, state };
};
