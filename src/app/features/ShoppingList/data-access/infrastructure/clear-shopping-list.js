import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const clearShoppingList = () => {
  return getHttpClient()
    .clear(collectionName)
    .then(() => {
      return Promise.resolve();
    });
};
