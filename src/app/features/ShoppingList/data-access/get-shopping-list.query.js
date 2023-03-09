import { useQuery } from 'react-query';

import { getAuth } from '../../../shared/utils/auth';
import { queryKey } from './shopping-list.query-key';
import { shoppingListService } from './shopping-list.service';

export const useGetShoppingListQuery = () => {
  return useQuery({
    initialData: [],
    queryKey: queryKey.shoppingList(),
    queryFn: () =>
      shoppingListService.getMany().then((snapshot) => {
        const userId = getAuth().currentUser.uid;
        const foodListData = [];
        if (snapshot && snapshot.docs && snapshot.docs.length) {
          snapshot.docs.forEach((doc) => foodListData.push({ ...doc.data(), id: doc.id }));
        }

        return foodListData.filter((doc) => {
          return doc.userUid === userId;
        });
      }),
  });
};
