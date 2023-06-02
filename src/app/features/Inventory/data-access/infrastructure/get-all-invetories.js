import {z} from 'zod';

import {getAuth} from '../../../../shared/utils/auth';
import {getHttpClient} from '../../../../shared/utils/http-client';
import {collectionName} from './consts';

const inventoryItemSchema = z.object({
    checked: z.boolean(),
    id: z.string(),
    userUid: z.string(),
    category: z.string(),
    name: z.string(),
    minimalQuantity: z.union([z.string(), z.number().min(0)]),
    maximalQuantity: z.union([z.string(), z.number().min(0)]),
    unit: z.enum([
        "kilogram",
        "liter",
        "piece"
    ]),
    currentQuantity: z.union([z.string(), z.number().min(0)])
}).transform((item) => ({
    ...item,
    minimalQuantity: Number.isInteger(item.minimalQuantity) ? item.minimalQuantity : parseInt(item.minimalQuantity),
    maximalQuantity: Number.isInteger(item.maximalQuantity) ? item.maximalQuantity : parseInt(item.maximalQuantity),
    currentQuantity: Number.isInteger(item.currentQuantity) ? item.currentQuantity : parseInt(item.currentQuantity),
}));

const inventoryItemsSchema = z.array(inventoryItemSchema);

export const getAllInventories = () =>
    getHttpClient()
        .getAll(collectionName)
        .then((snapshot) => {
            const userId = getAuth().currentUser.uid;
            const foodListData = [];
            if (snapshot && snapshot.docs && snapshot.docs.length) {
                snapshot.docs.forEach((doc) => foodListData.push({...doc.data(), id: doc.id}));
            }
            return inventoryItemsSchema.parse(foodListData.filter((doc) => {
                return doc.userUid === userId;
            }));
        });
