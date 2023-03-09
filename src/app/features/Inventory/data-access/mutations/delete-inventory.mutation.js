import { useMutation } from 'react-query';

import { inventoryService } from '../inventory.service';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useDeleteInventoryMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: (id) => inventoryService.delete(id),
    onSuccess: () => {
      invalidateAll();
    },
  });
};
