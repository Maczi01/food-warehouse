import { useMutation } from 'react-query';

import { toggleItem } from '../infrastructure/toggle-shopping-list-item';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useToggleShoppingListItemMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: toggleItem,
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
