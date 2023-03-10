import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const updateInventory = (item) => {
  return getHttpClient().update(collectionName, item.id, { ...item });
};
