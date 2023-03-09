import { useMutation } from 'react-query';

import { inventoryService } from '../inventory.service';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

const decreaseQuantity = (item) => {
  if (item.currentQuantity > 0) {
    return inventoryService.update({ ...item, currentQuantity: parseInt(item.currentQuantity) - 1 });
  }
  throw new Error('Cannot update quantity');
};

export const useDecreaseQuantityMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();

  return useMutation({
    mutationFn: decreaseQuantity,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
