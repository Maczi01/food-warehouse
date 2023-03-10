import { v4 as uuidv4 } from 'uuid';

import { getAuth } from '../../../../shared/utils/auth';
import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

const createShoppingListItem = (item) => {
  const newItem = {
    ...item,
    userUid: getAuth().currentUser.uid,
    id: uuidv4(),
    checked: false,
  };
  return getHttpClient().create(collectionName, newItem);
};

export const generateShoppingList = (inventory) => {
  const shoppingList = inventory
    .filter((item) => item.currentQuantity < item.minimalQuantity)
    .map((item) => ({
      neededQuantity: parseInt(item.maximalQuantity) - parseInt(item.currentQuantity),
      checked: false,
      name: item.name,
      unit: item.unit,
    }));
  return getHttpClient()
    .clear(collectionName)
    .then(() => Promise.resolve())
    .then(() => Promise.all(shoppingList.map((item) => createShoppingListItem(item))));
};
