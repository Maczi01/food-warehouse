import { useMutation } from 'react-query';

import { shoppingListService } from '../shopping-list.service';
import { useInvalidatedShoppingList } from './utils/invalidate-shopping-list';

const generateShoppingList = (inventory) => {
  const shoppingList = inventory
    .filter((item) => item.currentQuantity < item.minimalQuantity)
    .map((item) => ({
      neededQuantity: parseInt(item.maximalQuantity) - parseInt(item.currentQuantity),
      checked: false,
      name: item.name,
      unit: item.unit,
    }));
  return shoppingListService
    .clear()
    .then(() => Promise.all(shoppingList.map((item) => shoppingListService.create(item))));
};
export const useGenerateShoppingListMutation = () => {
  const invalidateShoppingList = useInvalidatedShoppingList();
  return useMutation({
    mutationFn: generateShoppingList,
    onSuccess: () => {
      invalidateShoppingList();
    },
  });
};
