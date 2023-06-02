import { v4 as uuidv4 } from 'uuid';

import { getAuth } from '../../../../shared/utils/auth';
import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const createInventory = (item) => {
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
