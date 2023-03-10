import { useMutation } from 'react-query';

import { createInventory } from '../infrastructure/create-inventory';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useAddInventoryMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: createInventory,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
