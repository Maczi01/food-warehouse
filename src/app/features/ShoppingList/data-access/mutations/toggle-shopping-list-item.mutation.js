import { useMutation } from 'react-query';

import { shoppingListService } from '../shopping-list.service';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

export const useToggleShoppingListItemMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: (item) => {
      const newItem = {
        ...item,
        checked: !item.checked,
      };
      return shoppingListService.update(newItem);
    },
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
