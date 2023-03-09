import {useMutation, useQueryClient} from 'react-query';

import {shoppingListService} from '../shopping-list.service';


export const useClearShoppingListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => shoppingListService.clear(),
        onSuccess: () => {
            queryClient.invalidateQueries('shoppingList');
        }
    });
}
