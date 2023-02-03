import { v4 as uuidv4 } from 'uuid';

import { getAuth } from '../shared/utills/Auth';
import { getHttpClient } from '../shared/utills/http-client';

const collectionName = 'shoppingList';

export class ShoppingListService {
  create = (item) => {
    const newItem = {
      ...item,
      userUid: getAuth().currentUser.uid,
      id: uuidv4(),
      checked: false,
    };
    return getHttpClient().create(collectionName, newItem);
  };

  update = (item) => getHttpClient().update(collectionName, item.id, { ...item });

  getMany = () => getHttpClient().getAll(collectionName);
}
