import {useQuery} from 'react-query';

import {getAuth} from '../../shared/utils/auth';
import {inventoryService} from './inventory.service';

export const useGetInventoriesQuery = () => {
    return useQuery({
        queryKey: 'inventory',
        queryFn: () => inventoryService.getMany().then((snapshot) => {
            const userId = getAuth().currentUser.uid
            const foodListData = [];
            if (snapshot && snapshot.docs && snapshot.docs.length) {
                snapshot.docs.forEach((doc) => foodListData.push({ ...doc.data(), id: doc.id }));
            }

            return foodListData.filter((doc) => {
                return doc.userUid === userId;
            });
        }),
    })
}
