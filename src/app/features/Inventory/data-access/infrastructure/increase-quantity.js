import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const increaseQuantity = (item) => {
  if (item.currentQuantity < parseInt(item.maximalQuantity)) {
    return getHttpClient().update(collectionName, item.id, {
      ...item,
      currentQuantity: parseInt(item.currentQuantity) + 1,
    });
  }
  throw new Error('Cannot update quantity');
};
