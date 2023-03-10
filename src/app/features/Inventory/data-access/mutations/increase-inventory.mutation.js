import { useMutation } from 'react-query';

import { inventoryService } from '../inventory.service';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

const increaseQuantity = (item) => {
  if (item.currentQuantity < parseInt(item.maximalQuantity)) {
    return inventoryService.update({ ...item, currentQuantity: parseInt(item.currentQuantity) + 1 });
  }
  throw new Error('Cannot update quantity');
};

export const useIncreaseQuantityMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: increaseQuantity,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
