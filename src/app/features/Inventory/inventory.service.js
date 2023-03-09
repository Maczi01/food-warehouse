import { v4 as uuidv4 } from 'uuid';

import { getAuth } from '../../shared/utils/auth';
import { getHttpClient } from '../../shared/utils/http-client';

const collectionName = 'foodList';

export class InventoryService {
  create = (item) => {
    const newItem = {
      ...item,
      userUid: getAuth().currentUser.uid,
      id: uuidv4(),
      checked: false,
    };
    return getHttpClient()
      .create(collectionName, newItem)
      .then((response) => ({
        id: response.id,
        checked: response.checked,
        category: response.category,
        currentQuantity: response.currentQuantity,
        maximalQuantity: response.maximalQuantity,
        minimalQuantity: response.minimalQuantity,
        name: response.name,
        unit: response.unit,
        userUid: response.userUid,
      }));
  };

  update = (item) => {
    //TODO map values
    // const updatedItem = {
    //     checked: item.checked,
    //     category: item.category,
    //     currentQuantity: item.quantity.current,
    //     maximalQuantity: item.maximalQuantity,
    //     minimalQuantity: item.minimalQuantity,
    //     name: item.name,
    //     unit: item.unit,
    //     userUid: item.userUid,
    // }

    return getHttpClient().update(collectionName, item.id, { ...item });
  };

  delete = (id) => getHttpClient().deleteOne(collectionName, id);

  getMany = () => getHttpClient().getAll(collectionName);
}

export const inventoryService = new InventoryService();
