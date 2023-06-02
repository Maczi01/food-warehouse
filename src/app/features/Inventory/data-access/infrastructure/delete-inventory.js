import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

export const deleteInventory = (id) => getHttpClient().deleteOne(collectionName, id);
