import { useMutation } from 'react-query';

import { updateInventory } from '../infrastructure/update-inventory';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useEditInventoryMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: updateInventory,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
