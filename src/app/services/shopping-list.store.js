import { useEffect, useMemo, useState } from 'react';

import { getAuth } from '../shared/utills/auth';
import { getHttpClient } from '../shared/utills/http-client';
import { ShoppingListService } from './shopping-list.service';

const collectionName = 'shoppingList';

export class ShoppingListStore {
  static instance = null;
  api;
  state = {
    shoppingList: [],
  };
  callbacks = [];

  constructor(api) {
    this.api = api;
  }

  static getInstance = () => {
    if (!ShoppingListStore.instance) {
      ShoppingListStore.instance = new ShoppingListStore(new ShoppingListService());
    }
    return ShoppingListStore.instance;
  };

  onShoppingListUpdate = (shoppingList) => {
    this.state = { ...this.state, shoppingList: shoppingList ? shoppingList : [] };
    this.callbacks.forEach((callback) => callback()(this.state.shoppingList));
  };

  addListener = (callback) => {
    this.callbacks.push(callback);
  };

  removeListener = (callback) => {
    const index = this.callbacks.findIndex(callback);
    this.callbacks.splice(index, 1);
  };

  addItem = (item) => {
    return this.api.create(item).then((response) => {
      return this.getForCurrentUser().then(() => {
        return response;
      });
    });
  };

  toggleItem = (item) => {
    const newItem = {
      ...item,
      checked: !item.checked,
    };
    return this.api.update(newItem).then((response) => {
      return this.getForCurrentUser().then(() => {
        return response;
      });
    });
  };

  clearList = () => {
    return getHttpClient()
      .clear(collectionName)
      .then((response) => {
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
        snapshot.forEach((doc) => foodListData.push({ ...doc.data(), id: doc.id }));
        return foodListData.filter((doc) => {
          return doc.userUid === userId;
        });
      })
      .then((shoppingList) => {
        this.onShoppingListUpdate(shoppingList);
      });
  };

  generateShoppingList = (inventory) => {
    return this.clearList().then(() => {
      return this.getByUser(getAuth().currentUser.uid)
        .then((shoppingList) => {
          const newShoppingList = (inventory || [])
            .filter((item) => item.currentQuantity < item.minimalQuantity)
            .map((item) => {
              const newItem = {
                ...item,
              };
              newItem.neededQuantity = parseInt(item.maximalQuantity) - parseInt(item.currentQuantity);
              delete newItem.id;
              delete newItem.minimalQuantity;
              delete newItem.maximalQuantity;
              delete newItem.currentQuantity;
              delete newItem.category;
              newItem.checked = false;
              newItem.userUid = getAuth().currentUser.uid;
              return newItem;
            })
            .filter((u) => (shoppingList ? shoppingList : []).findIndex((lu) => lu.name === u.name) === -1);
          return Promise.all(newShoppingList.map((item) => this.addItem(item)));
        })
        .then((response) => {
          return this.getForCurrentUser().then(() => {
            return response;
          });
        });
    });
  };

  getForCurrentUser = () => {
    return this.getByUser(getAuth().currentUser.uid);
  };
}

export const useStoppingListStore = () => {
  const shoppingList = useMemo(() => ShoppingListStore.getInstance());
  const [state, setState] = useState(() => shoppingList.state);
  useEffect(() => {
    const callback = () => (shoppingList) => {
      setState({ shoppingList: shoppingList });
    };
    shoppingList.addListener(callback);
    return () => {
      shoppingList.removeListener(callback);
    };
  }, [shoppingList, setState]);

  return { ...shoppingList, state };
};
