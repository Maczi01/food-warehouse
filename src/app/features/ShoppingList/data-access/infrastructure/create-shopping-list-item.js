import { v4 as uuidv4 } from 'uuid';

import { getAuth } from '../../../../shared/utils/auth';
import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const createShoppingListItem = (item) => {
  const newItem = {
    ...item,
    userUid: getAuth().currentUser.uid,
    id: uuidv4(),
    checked: false,
  };
  return getHttpClient().create(collectionName, newItem);
};
