import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';

import List from '../components/list.component';
import { useGetInventoriesQuery } from '../data-access/get-inventories.query';
import { Heading } from './main-view.styled';

const allCategoryName = 'all';

const MainViewComponent = () => {
  const { parameter } = useParams();
  const inventory = useGetInventoriesQuery();
  const newFoodList =
    parameter === allCategoryName ? inventory.data : inventory.data.filter((item) => item.category === parameter);

  useEffect(() => {
    inventory.refetch();
  }, []);

  return (
    <>
      <Heading>
        <FormattedMessage id="INVENTORY.HEADER.WHAT_IN_INVENTORY" />
      </Heading>
      {inventory.isLoading ? (
        <FormattedMessage id="GLOBAL.STATUS.LOADING" />
      ) : (
        <List items={newFoodList} parameter={parameter} />
      )}
    </>
  );
};

export default MainViewComponent;
