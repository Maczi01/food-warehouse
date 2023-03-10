import { useMutation } from 'react-query';

import { clearShoppingList } from '../infrastructure/clear-shopping-list';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useClearShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: clearShoppingList,
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
