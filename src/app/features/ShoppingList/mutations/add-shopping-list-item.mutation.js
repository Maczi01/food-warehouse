import {useMutation, useQueryClient} from 'react-query';

import {shoppingListService} from '../shopping-list.service';


export const useAddItemToShoppingListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item) => shoppingListService.create(item),
        onSuccess: () => {
            queryClient.invalidateQueries('shoppingList');
        }
    });
}
