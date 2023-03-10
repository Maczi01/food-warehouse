import { getHttpClient } from '../../../../shared/utils/http-client';
import { collectionName } from './consts';

const update = (item) => getHttpClient().update(collectionName, item.id, { ...item });

export const toggleItem = (item) => {
  const newItem = {
    ...item,
    checked: !item.checked,
  };
  return update(newItem);
};
