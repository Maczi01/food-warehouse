import {useMutation, useQueryClient} from 'react-query';

import {shoppingListService} from '../shopping-list.service';


const generateShoppingList = (inventory) => {
    const shoppingList = inventory.filter(item => item.currentQuantity < item.minimalQuantity)
        .map(item => ({
            neededQuantity: parseInt(item.maximalQuantity) - parseInt(item.currentQuantity),
            checked: false,
            name: item.name,
            unit: item.unit,
        }))
    return shoppingListService.clear().then(() =>
        Promise.all(shoppingList.map((item) => shoppingListService.create(item)))
    );
}
export const useGenerateShoppingListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: generateShoppingList,
        onSuccess: () => {
            queryClient.invalidateQueries('shoppingList');
        }
    });
}
