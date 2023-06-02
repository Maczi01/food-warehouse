import { getAuth } from '../../../../shared/utils/auth';
import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const getShoppingListItems = () => {
  return getHttpClient()
    .getAll(collectionName)
    .then((snapshot) => {
      const userId = getAuth().currentUser.uid;
      const foodListData = [];
      if (snapshot && snapshot.docs && snapshot.docs.length) {
        snapshot.docs.forEach((doc) => foodListData.push({ ...doc.data(), id: doc.id }));
      }

      return foodListData.filter((doc) => {
        return doc.userUid === userId;
      });
    });
};
