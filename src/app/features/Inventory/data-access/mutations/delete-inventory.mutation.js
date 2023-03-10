import { useMutation } from 'react-query';

import { deleteInventory } from '../infrastructure/delete-inventory';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useDeleteInventoryMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
