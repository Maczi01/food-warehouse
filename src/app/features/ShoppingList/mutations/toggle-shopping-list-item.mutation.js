import {useMutation, useQueryClient} from 'react-query';

import {shoppingListService} from '../shopping-list.service';


export const useToggleShoppingListItemMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  (item) => {
            const newItem = {
                ...item,
                checked: !item.checked,
            };
            return shoppingListService.update(newItem);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('shoppingList');
        }
    });
}
