import { useQuery } from 'react-query';

import { getShoppingListItems } from './infrastructure/get-shopping-list-items';
import { queryKey } from './shopping-list.query-key';

export const useGetShoppingListQuery = () => {
  return useQuery({
    initialData: [],
    queryKey: queryKey.shoppingList(),
    queryFn: getShoppingListItems,
  });
};
