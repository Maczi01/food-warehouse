import {z} from 'zod';

import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

const inventoryItemSchema = z.object({
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


export const updateInventory = (item) => {
  const data = inventoryItemSchema.parse(item);
  return getHttpClient().update(collectionName, data.id, { ...data })
      .then((data) => {
        // return inventoryItemSchema.parse(data);
        //     console.log('updateInventory', data)
            return data
          }
      );
};
