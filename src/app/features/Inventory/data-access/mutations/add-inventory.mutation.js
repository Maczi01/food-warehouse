import { useMutation } from 'react-query';

import { inventoryService } from '../inventory.service';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useAddInventoryMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: (item) => inventoryService.create(item),
    onSuccess: () => {
      invalidateAll();
    },
  });
};
