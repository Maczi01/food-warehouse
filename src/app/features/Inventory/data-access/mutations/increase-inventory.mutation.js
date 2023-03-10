import { useMutation } from 'react-query';

import { increaseQuantity } from '../infrastructure/increase-quantity';
import { useInvalidatedAllInventories } from './utils/invalidate-all-inventories';

export const useIncreaseQuantityMutation = () => {
  const invalidateAll = useInvalidatedAllInventories();
  return useMutation({
    mutationFn: increaseQuantity,
    onSuccess: () => {
      invalidateAll();
    },
  });
};
