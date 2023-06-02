import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const decreaseQuantity = (item) => {
  if (item.currentQuantity > 0) {
    return getHttpClient().update(collectionName, item.id, {
      ...item,
      currentQuantity: parseInt(item.currentQuantity) - 1,
    });
  }
  throw new Error('Cannot update quantity');
};
